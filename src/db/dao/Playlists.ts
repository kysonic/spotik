import sql from '../client';

export type Playlist = {
  id: number;
  title: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;

  user_id: number;
};

export type InsertPlaylistArgs = Omit<
  Playlist,
  'id' | 'created_at' | 'updated_at'
>;

export type UpdatePlaylistsArgs = Partial<InsertPlaylistArgs> & {
  updated_at?: Date;
};

class PlaylistsDao {
  static async find() {
    const rows = await sql<Playlist[]>`SELECT * FROM playlists;`;

    return rows;
  }

  static async findById(id: number) {
    const rows = await sql<
      Playlist[]
    >`SELECT * FROM playlists WHERE id = ${id};`;

    return rows[0];
  }

  static async insert(fields: InsertPlaylistArgs) {
    const rows = await sql<Playlist[]>`INSERT INTO playlists ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} RETURNING *`;

    return rows[0];
  }

  static async update(id: number, fields: UpdatePlaylistsArgs) {
    const rows = await sql<Playlist[]>`UPDATE playlists SET ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} WHERE id = ${id} RETURNING *`;

    return rows[0];
  }

  static async delete(id: number) {
    const rows = await sql<
      Playlist[]
    >`DELETE FROM playlists WHERE id = ${id} RETURNING *;`;

    return rows[0];
  }

  static async count() {
    const rows = await sql<
      { count: string }[]
    >`SELECT COUNT(*) FROM playlists;`;

    return parseInt(rows[0].count);
  }
}

export default PlaylistsDao;
