import sql from './client';

export type InsertAlbumsArgs = {
  title: string;
  release_date?: string;
  artist_id?: number;
};

export type UpdateAlbumsArgs = InsertAlbumsArgs & {
  updated_at: Date;
};

class AlbumsDao {
  static async find() {
    const rows = await sql`SELECT * FROM albums;`;

    return rows;
  }

  static async findById(id: number) {
    const rows = await sql`SELECT * FROM albums WHERE id = ${id};`;

    return rows[0];
  }

  static async insert(fields: InsertAlbumsArgs) {
    const rows = await sql`INSERT INTO albums ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} RETURNING *`;

    return rows[0];
  }

  static async update(id: number, fields: UpdateAlbumsArgs) {
    const rows = await sql`UPDATE albums SET ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} WHERE id = ${id} RETURNING *`;

    return rows[0];
  }

  static async delete(id: number) {
    const rows = await sql`DELETE FROM albums WHERE id = ${id} RETURNING *;`;

    return rows[0];
  }

  static async count() {
    const rows = await sql`SELECT COUNT(*) FROM albums;`;

    return parseInt(rows[0].count);
  }
}

export default AlbumsDao;
