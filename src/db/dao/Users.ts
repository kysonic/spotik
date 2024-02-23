import pool from '@/db/pool';
import { noRows } from '@/db/utils';

export type InsertUserArgs = {
  email: string;
  external_id?: string;
  first_name?: string;
  last_name?: string;
};

export type UpdateUserArgs = InsertUserArgs & {
  id: number;
  updated_at: Date;
};

class UsersDao {
  static async find() {
    const { rows } = (await pool?.query('SELECT * FROM users;')) ?? noRows;

    return rows;
  }

  static async findById(id: number) {
    const { rows } =
      (await pool?.query('SELECT * FROM users WHERE id = $1;', [id])) ?? noRows;

    return rows;
  }

  static async insert({
    email,
    external_id,
    first_name,
    last_name,
  }: InsertUserArgs) {
    const { rows } =
      (await pool?.query(
        'INSERT INTO users (email, external_id, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *;',
        [email, external_id, first_name, last_name]
      )) ?? noRows;

    return rows[0];
  }

  static async update({
    id,
    email,
    external_id,
    first_name,
    last_name,
  }: UpdateUserArgs) {
    const { rows } =
      (await pool.query(
        'UPDATE users SET email = $2, external_id = $3, first_name = $4, last_name = $5  WHERE id = $1 RETURNING *;',
        [id, email, external_id, first_name, last_name]
      )) ?? noRows;

    return rows[0];
  }

  static async delete(id: number) {
    const { rows } =
      (await pool.query('DELETE FROM users WHERE id = $1 RETURNING *;', [
        id,
      ])) ?? noRows;

    return rows[0];
  }

  static async count() {
    const { rows } =
      (await pool.query('SELECT COUNT(*) FROM users;')) ?? noRows;

    return parseInt(rows[0]?.count);
  }
}

export default UsersDao;
