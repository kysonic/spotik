import sql from '../client';

export type Artist = {
  id: number;
  nickname: string;
  about?: string;
  career_start?: string;
  cover?: string;
  created_at?: Date;
  updated_at?: Date;
};

export type InsertArtistArgs = Omit<Artist, 'id' | 'created_at' | 'updated_at'>;

export type UpdateArtistsArgs = Partial<InsertArtistArgs> & {
  updated_at?: Date;
};

class ArtistsDao {
  static async find() {
    const rows = await sql<Artist[]>`SELECT * FROM artists;`;

    return rows;
  }

  static async findById(id: number) {
    const rows = await sql<Artist[]>`SELECT * FROM artists WHERE id = ${id};`;

    return rows[0];
  }

  static async insert(fields: InsertArtistArgs) {
    const rows = await sql<Artist[]>`INSERT INTO artists ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} RETURNING *`;

    return rows[0];
  }

  static async update(id: number, fields: UpdateArtistsArgs) {
    const rows = await sql<Artist[]>`UPDATE artists SET ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} WHERE id = ${id} RETURNING *`;

    return rows[0];
  }

  static async delete(id: number) {
    const rows = await sql<
      Artist[]
    >`DELETE FROM artists WHERE id = ${id} RETURNING *;`;

    return rows[0];
  }

  static async count() {
    const rows = await sql<{ count: string }[]>`SELECT COUNT(*) FROM artists;`;

    return parseInt(rows[0].count);
  }

  static async getForUser({ genres }: { genres: string[] }) {
    const rows = await sql<Artist[]>`
    SELECT DISTINCT ON (id) ar.*, s.plays_count FROM artists AS ar 
    JOIN albums AS al ON al.artist_id = ar.id 
    JOIN songs AS s ON al.id = s.album_id
    WHERE s.genres && ${genres} LIMIT 5;;
    `;

    return rows;
  }
}

export default ArtistsDao;
