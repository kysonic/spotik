import { ArrayElement } from '@/types/globals';
import sql from '../client';
import { Album } from './Albums';
import { Artist } from './Artists';

export type Song = {
  id: number;
  title: string;
  length?: number;
  plays_count?: number;
  genres?: string[];
  album_id?: number;
  cover?: string;
  created_at?: string;
  updated_at?: string;
};

export type InsertSongsArgs = Omit<Song, 'id' | 'created_at' | 'updated_at'>;

export type UpdateSongsArgs = Partial<InsertSongsArgs> & {
  updated_at?: Date;
};

export type SongWithArtistAndAlbum = Song & {
  artist: Artist['nickname'];
  album: Album['title'];
};
export type SongsWithArtistAndAlbum = SongWithArtistAndAlbum[];
class SongsDao {
  static async find() {
    const rows = await sql<Song[]>`SELECT * FROM songs;`;

    return rows;
  }

  static async findById(id: number) {
    const rows = await sql<Song[]>`SELECT * FROM songs WHERE id = ${id};`;

    return rows[0];
  }

  static async insert(fields: InsertSongsArgs) {
    const rows = await sql<Song[]>`INSERT INTO songs ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} RETURNING *`;

    return rows[0];
  }

  static async update(id: number, fields: UpdateSongsArgs) {
    const rows = await sql<Song[]>`UPDATE songs SET ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} WHERE id = ${id} RETURNING *`;

    return rows[0];
  }

  static async delete(id: number) {
    const rows = await sql<
      Song[]
    >`DELETE FROM songs WHERE id = ${id} RETURNING *;`;

    return rows[0];
  }

  static async count() {
    const rows = await sql<{ count: string }[]>`SELECT COUNT(*) FROM songs;`;

    return parseInt(rows[0].count);
  }

  static async getGenres() {
    const rows = await sql<
      { unnest: string }[]
    >`SELECT DISTINCT UNNEST(genres) FROM songs;`;

    return rows;
  }

  static async getReleases({ genres = [] }: { genres: string[] }) {
    const rows = await sql<SongsWithArtistAndAlbum>`
      SELECT s.*, al.title as album, nickname as artist FROM songs as s 
      LEFT JOIN albums as al ON al.id = s.album_id
      LEFT JOIN artists as ar ON ar.id = al.artist_id
      WHERE genres && ${genres} ORDER BY s.updated_at DESC LIMIT 30;`;

    return rows;
  }

  static async getByGenre({ genre }: { genre: string }) {
    const rows = await sql<SongsWithArtistAndAlbum>`
    SELECT s.*, al.title as album, nickname as artist FROM songs as s 
    LEFT JOIN albums as al ON al.id = s.album_id
    LEFT JOIN artists as ar ON ar.id = al.artist_id
    WHERE ${genre} = ANY(genres) ORDER BY s.plays_count DESC LIMIT 30;`;

    return rows;
  }

  static async getBySearch({ query }: { query: string }) {
    const rows = await sql<SongsWithArtistAndAlbum>`
    SELECT s.*, al.title as album, nickname as artist FROM songs as s 
    LEFT JOIN albums as al ON al.id = s.album_id
    LEFT JOIN artists as ar ON ar.id = al.artist_id
    WHERE s.title LIKE ${'%' + query + '%'} 
    OR al.title LIKE ${'%' + query + '%'}
    OR ar.nickname LIKE ${'%' + query + '%'}
    ORDER BY s.plays_count DESC LIMIT 30;`;

    return rows;
  }
}

export default SongsDao;
