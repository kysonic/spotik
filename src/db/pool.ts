import pg, { PoolConfig, Pool as PgPool } from 'pg';

class Pool {
  private _pool: PgPool | null = null;

  connect(options: PoolConfig) {
    this._pool = new pg.Pool(options);
    // Health check
    return this._pool.query('SELECT 1 + 1;');
  }

  close() {
    return this._pool?.end();
  }

  query(sql: string, params?: any[]) {
    return this._pool?.query(sql, params);
  }
}
const pool = new Pool();

export default pool;
