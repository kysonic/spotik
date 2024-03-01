import sql from '../client';
import { Song, SongWithArtistAndAlbum } from './Songs';

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

export type PlaylistWithSong = Playlist & SongWithArtistAndAlbum;

export type PlaylistNestedSongs = Playlist & {
  songs: SongWithArtistAndAlbum[];
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

  static async findByIdWithSongs(id: number) {
    const rows = await sql<
      (PlaylistWithSong & {
        song_id: number;
        song_title: string;
        song_created_at: string;
        song_updated_at: string;
        song_cover: string;
      })[]
    >`SELECT p.*, s.id as song_id, s.title as song_title, s.created_at as song_created_at, 
      s.updated_at as song_updated_at, s.cover as song_cover, s.length,
      al.title as album, nickname as artist  FROM playlists AS p
      LEFT JOIN playlists_songs AS ps ON p.id = ps.playlist_id
	    LEFT JOIN songs AS s ON ps.song_id = s.id
	    LEFT JOIN albums as al ON al.id = s.album_id
      LEFT JOIN artists as ar ON ar.id = al.artist_id
      WHERE p.id = ${id};`;

    const firstRow = rows[0];
    const playlist = {
      id: firstRow.id,
      title: firstRow.title,
      description: firstRow.description,
      created_at: firstRow.created_at,
      updated_at: firstRow.updated_at,
      user_id: firstRow.user_id,

      songs: [] as SongWithArtistAndAlbum[],
    };

    if (firstRow.song_id) {
      playlist.songs = rows.map((row) => ({
        id: row.song_id,
        title: row.song_title,
        album: row.album,
        artist: row.artist,
        cover: row.song_cover,
        length: row.length,
        created_at: row.song_created_at,
        updated_at: row.song_updated_at,
      }));
    }

    return playlist as unknown as PlaylistNestedSongs;
  }

  static async getByUserId(id: number) {
    const rows = await sql<
      Playlist[]
    >`SELECT * FROM playlists WHERE user_id = ${id};`;

    return rows;
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
