import sql from '../client';
import { SongWithArtistAndAlbum } from './Songs';

export type User = {
  id: number;
  email: string;
  external_id?: string;
  current_song_id?: number;
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

export type UserWithSong = User & SongWithArtistAndAlbum;
export type UserWithNestedSong = User & {
  song: SongWithArtistAndAlbum;
};

class UsersDao {
  static async find() {
    const rows = await sql<User[]>`SELECT * FROM users;`;

    return rows;
  }

  static async findById(id: number) {
    const rows = await sql<User[]>`SELECT * FROM users WHERE id = ${id};`;

    return rows[0] as User;
  }

  static async findByExternalId(id: string) {
    const rows = await sql<
      User[]
    >`SELECT * FROM users WHERE external_id = ${id};`;

    return rows[0];
  }

  static async findByExternalIdWithSong(id: string) {
    const rows = await sql<
      (User & {
        song_id: number;
        song_title: string;
        song_created_at: string;
        song_updated_at: string;
        song_cover: string;
        plays_count: number;
        artist: string;
        album: string;
      })[]
    >`SELECT u.*, 
    s.id as song_id, s.title as song_title, s.created_at as song_created_at, 
    s.updated_at as song_updated_at, s.cover as song_cover, s.length, s.plays_count,
    al.title as album, nickname as artist
    FROM users AS u 
    LEFT JOIN songs AS s ON s.id = u.current_song_id
    LEFT JOIN albums AS al ON s.album_id = al.id
    LEFT JOIN artists AS ar ON al.artist_id = ar.id
    WHERE u.external_id = ${id}`;

    // Mapping
    const firstRow = rows[0];
    const user: UserWithNestedSong = {
      id: firstRow.id,
      email: firstRow.email,
      first_name: firstRow.first_name,
      last_name: firstRow.last_name,
      genres: firstRow.genres,
      created_at: firstRow.created_at,
      updated_at: firstRow.updated_at,

      song: {
        id: firstRow.song_id,
        title: firstRow.song_title,
        cover: firstRow.song_cover,
        plays_count: firstRow.plays_count,
        created_at: firstRow.song_created_at,
        updated_at: firstRow.song_updated_at,
        album: firstRow.album,
        artist: firstRow.artist,
      },
    };

    return user as unknown as UserWithNestedSong;
  }

  static async insert(fields: InsertUserArgs) {
    const rows = await sql<User[]>`INSERT INTO users ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} RETURNING *`;

    return rows[0];
  }

  static async update(id: string, fields: UpdateUserArgs) {
    const rows = await sql<User[]>`UPDATE users SET ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} WHERE external_id = ${id} RETURNING *`;

    return rows[0];
  }

  static async delete(id: string) {
    const rows = await sql<
      User[]
    >`DELETE FROM users WHERE external_id = ${id} RETURNING *;`;

    return rows[0];
  }

  static async count() {
    const rows = await sql<{ count: string }[]>`SELECT COUNT(*) FROM users;`;

    return parseInt(rows[0].count);
  }
}

export default UsersDao;
