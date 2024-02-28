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
    const rows = await sql`SELECT * FROM artists;`;

    return rows;
  }

  static async findById(id: number) {
    const rows = await sql`SELECT * FROM artists WHERE id = ${id};`;

    return rows[0];
  }

  static async insert(fields: InsertArtistArgs) {
    const rows = await sql`INSERT INTO artists ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} RETURNING *`;

    return rows[0];
  }

  static async update(id: number, fields: UpdateArtistsArgs) {
    const rows = await sql`UPDATE artists SET ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} WHERE id = ${id} RETURNING *`;

    return rows[0];
  }

  static async delete(id: number) {
    const rows = await sql`DELETE FROM artists WHERE id = ${id} RETURNING *;`;

    return rows[0];
  }

  static async count() {
    const rows = await sql`SELECT COUNT(*) FROM artists;`;

    return parseInt(rows[0].count);
  }
}

export default ArtistsDao;
