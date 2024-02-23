import sql from '@/db/client';

export type InsertUserArgs = {
  email: string;
  external_id?: string;
  first_name?: string;
  last_name?: string;
};

export type UpdateUserArgs = InsertUserArgs & {
  updated_at: Date;
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

  static async insert({
    email,
    external_id,
    first_name,
    last_name,
  }: InsertUserArgs) {
    const rows =
      await sql`INSERT INTO users (email, external_id, first_name, last_name) VALUES('${email}', '${external_id}', '${first_name}', '${last_name}')`;

    return rows[0];
  }

  static async update(
    id: number,
    { email, external_id, first_name, last_name, updated_at }: UpdateUserArgs
  ) {
    const rows =
      await sql`UPDATE users SET email = '${email}', external_id = '${external_id}', first_name = '${first_name}', last_name = '${last_name}', updated_at = ${updated_at} WHERE id = ${id} RETURNING *`;

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
