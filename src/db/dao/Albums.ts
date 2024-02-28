import sql from '../client';

export type Album = {
  id: number;
  title: string;
  release_date?: string;
  artist_id?: number;
  cover?: string;
  created_at?: Date;
  updated_at?: Date;
};

export type InsertAlbumsArgs = Omit<Album, 'id' | 'created_at' | 'updated_at'>;

export type UpdateAlbumsArgs = Partial<InsertAlbumsArgs> & {
  updated_at?: Date;
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
