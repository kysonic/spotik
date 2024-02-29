import sql from '../client';

export type PlaylistsSongs = {
  id: number;
  created_at?: Date;

  playlist_id: number;
  song_id: number;
};

export type InsertPlaylistsSongsArgs = Omit<
  PlaylistsSongs,
  'id' | 'created_at' | 'updated_at'
>;

export type UpdatePlaylistsSongsArgs = Partial<InsertPlaylistsSongsArgs> & {
  updated_at?: Date;
};

class PlaylistsSongsDao {
  static async find() {
    const rows = await sql<PlaylistsSongs[]>`SELECT * FROM playlists_songs;`;

    return rows;
  }

  static async findById(id: number) {
    const rows = await sql<
      PlaylistsSongs[]
    >`SELECT * FROM playlists_songs WHERE id = ${id};`;

    return rows[0];
  }

  static async insert(fields: InsertPlaylistsSongsArgs) {
    const rows = await sql<PlaylistsSongs[]>`INSERT INTO playlists_songs ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} RETURNING *`;

    return rows[0];
  }

  static async update(id: number, fields: UpdatePlaylistsSongsArgs) {
    const rows = await sql<PlaylistsSongs[]>`UPDATE playlists_songs SET ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} WHERE id = ${id} RETURNING *`;

    return rows[0];
  }

  static async delete(id: number) {
    const rows = await sql<
      PlaylistsSongs[]
    >`DELETE FROM playlists_songs WHERE id = ${id} RETURNING *;`;

    return rows[0];
  }

  static async count() {
    const rows = await sql<
      { count: string }[]
    >`SELECT COUNT(*) FROM playlists_songs;`;

    return parseInt(rows[0].count);
  }
}

export default PlaylistsSongsDao;
