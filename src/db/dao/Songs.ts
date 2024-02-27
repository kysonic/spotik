import sql from '../client';

export type InsertSongsArgs = {
  title: string;
  length?: number;
  plays_count?: number;
  genres?: string[];
  album_id?: number;
};

export type UpdateSongsArgs = InsertSongsArgs & {
  updated_at: Date;
};

class SongsDao {
  static async find() {
    const rows = await sql`SELECT * FROM songs;`;

    return rows;
  }

  static async findById(id: number) {
    const rows = await sql`SELECT * FROM songs WHERE id = ${id};`;

    return rows[0];
  }

  static async insert(fields: InsertSongsArgs) {
    const rows = await sql`INSERT INTO songs ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} RETURNING *`;

    return rows[0];
  }

  static async update(id: number, fields: UpdateSongsArgs) {
    const rows = await sql`UPDATE songs SET ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} WHERE id = ${id} RETURNING *`;

    return rows[0];
  }

  static async delete(id: number) {
    const rows = await sql`DELETE FROM songs WHERE id = ${id} RETURNING *;`;

    return rows[0];
  }

  static async count() {
    const rows = await sql`SELECT COUNT(*) FROM songs;`;

    return parseInt(rows[0].count);
  }

  static async getGenres() {
    const rows = await sql`SELECT DISTINCT UNNEST(genres) FROM songs;`;

    return rows;
  }
}

export default SongsDao;
