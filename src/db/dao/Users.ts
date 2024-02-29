import sql from '../client';

export type User = {
  id: number;
  email: string;
  external_id?: string;
  genres?: string[];
  first_name?: string;
  last_name?: string;
  created_at?: Date;
  updated_at?: Date;
};

export type InsertUserArgs = Omit<User, 'id' | 'created_at' | 'updated_at'>;

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

    return rows[0] as User;
  }

  static async findByExternalId(id: string) {
    const rows = await sql`SELECT * FROM users WHERE external_id = ${id};`;

    return rows[0] as User;
  }

  static async insert(fields: InsertUserArgs) {
    const rows = await sql`INSERT INTO users ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} RETURNING *`;

    return rows[0];
  }

  static async update(id: string, fields: UpdateUserArgs) {
    const rows = await sql`UPDATE users SET ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} WHERE external_id = ${id} RETURNING *`;

    return rows[0];
  }

  static async delete(id: string) {
    const rows =
      await sql`DELETE FROM users WHERE external_id = ${id} RETURNING *;`;

    return rows[0];
  }

  static async count() {
    const rows = await sql`SELECT COUNT(*) FROM users;`;

    return parseInt(rows[0].count);
  }
}

export default UsersDao;
