import sql from '../client';
import { SongWithArtistAndAlbum } from './Songs';

export type Album = {
  id: number;
  title: string;
  release_date?: string;
  artist_id?: number;
  cover?: string;
  created_at?: Date;
  updated_at?: Date;
};

export type InsertAlbumsArgs = Omit<Album, 'id' | 'created_at' | 'updated_at'>;

export type UpdateAlbumsArgs = Partial<InsertAlbumsArgs> & {
  updated_at?: Date;
};

export type AlbumWithNestedSongs = Album & {
  songs: SongWithArtistAndAlbum[];
};

class AlbumsDao {
  static async find() {
    const rows = await sql<Album[]>`SELECT * FROM albums;`;

    return rows;
  }

  static async findById(id: number) {
    const rows = await sql<Album[]>`SELECT * FROM albums WHERE id = ${id};`;

    return rows[0];
  }

  static async insert(fields: InsertAlbumsArgs) {
    const rows = await sql<Album[]>`INSERT INTO albums ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} RETURNING *`;

    return rows[0];
  }

  static async update(id: number, fields: UpdateAlbumsArgs) {
    const rows = await sql<Album[]>`UPDATE albums SET ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} WHERE id = ${id} RETURNING *`;

    return rows[0];
  }

  static async delete(id: number) {
    const rows = await sql<
      Album[]
    >`DELETE FROM albums WHERE id = ${id} RETURNING *;`;

    return rows[0];
  }

  static async count() {
    const rows = await sql<{ count: string }[]>`SELECT COUNT(*) FROM albums;`;

    return parseInt(rows[0].count);
  }

  static async findByIdWithSongs(id: number) {
    const rows = await sql<
      (Album & {
        nickname: string;
        song_id: number;
        song_title: string;
        song_created_at: string;
        song_updated_at: string;
        song_cover: string;
        length: number;
      })[]
    >`
    SELECT 
    al.*, 
    s.id as song_id, s.title as song_title, s.cover as song_cover, s.created_at as song_created_at, s.updated_at as song_updated_at, s.length,
	  ar.nickname
    FROM albums AS al
    LEFT JOIN songs AS s ON s.album_id = al.id
	  LEFT JOIN artists AS ar ON al.artist_id = ar.id
    WHERE al.id = ${id} ORDER BY s.created_at DESC;
    `;

    // Mappings
    const firstRow = rows[0];
    const album: AlbumWithNestedSongs = {
      ...firstRow,
      songs: [],
    };

    for (let row of rows) {
      album.songs.push({
        id: row.song_id,
        title: row.song_title,
        length: row.length,
        cover: row.song_cover,
        created_at: row.song_created_at,
        updated_at: row.song_updated_at,
        album: row.title,
        artist: row.nickname,
      });
    }

    return album;
  }
}

export default AlbumsDao;
