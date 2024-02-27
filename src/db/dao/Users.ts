import sql from './client';

export type InsertUserArgs = {
  email: string;
  external_id?: string;
  first_name?: string;
  last_name?: string;
};

export type UpdateUserArgs = Partial<InsertUserArgs> & {
  updated_at?: Date;
};

class UsersDao {
  static async find() {
    const rows = await sql`SELECT * FROM users;`;

    return rows;
  }

  static async findById(id: number) {
    const rows = await sql`SELECT * FROM users WHERE id = ${id};`;

    return rows[0];
  }

  static async insert(fields: InsertUserArgs) {
    const rows = await sql`INSERT INTO users ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} RETURNING *`;

    return rows[0];
  }

  static async update(id: number, fields: UpdateUserArgs) {
    const rows = await sql`UPDATE users SET ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} WHERE id = ${id} RETURNING *`;

    return rows[0];
  }

  static async delete(id: number) {
    const rows = await sql`DELETE FROM users WHERE id = ${id} RETURNING *;`;

    return rows[0];
  }

  static async count() {
    const rows = await sql`SELECT COUNT(*) FROM users;`;

    return parseInt(rows[0].count);
  }
}

export default UsersDao;
