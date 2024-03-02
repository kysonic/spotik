import sql from '../client';
import { Album } from './Albums';
import { Song, SongWithArtistAndAlbum } from './Songs';

export type Artist = {
  id: number;
  nickname: string;
  about?: string;
  career_start?: string;
  cover?: string;
  created_at?: Date;
  updated_at?: Date;
};

export type InsertArtistArgs = Omit<Artist, 'id' | 'created_at' | 'updated_at'>;

export type UpdateArtistsArgs = Partial<InsertArtistArgs> & {
  updated_at?: Date;
};

export type ArtistWithNestedAlbumsAndSongs = Artist & {
  albums: Album[];
  songs: SongWithArtistAndAlbum[];
};

class ArtistsDao {
  static async find() {
    const rows = await sql<Artist[]>`SELECT * FROM artists;`;

    return rows;
  }

  static async findById(id: number) {
    const rows = await sql<Artist[]>`SELECT * FROM artists WHERE id = ${id};`;

    return rows[0];
  }

  static async insert(fields: InsertArtistArgs) {
    const rows = await sql<Artist[]>`INSERT INTO artists ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} RETURNING *`;

    return rows[0];
  }

  static async update(id: number, fields: UpdateArtistsArgs) {
    const rows = await sql<Artist[]>`UPDATE artists SET ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} WHERE id = ${id} RETURNING *`;

    return rows[0];
  }

  static async delete(id: number) {
    const rows = await sql<
      Artist[]
    >`DELETE FROM artists WHERE id = ${id} RETURNING *;`;

    return rows[0];
  }

  static async count() {
    const rows = await sql<{ count: string }[]>`SELECT COUNT(*) FROM artists;`;

    return parseInt(rows[0].count);
  }

  static async getForUser({ genres }: { genres: string[] }) {
    const rows = await sql<Artist[]>`
    SELECT DISTINCT ON (id) ar.*, s.plays_count FROM artists AS ar 
    JOIN albums AS al ON al.artist_id = ar.id 
    JOIN songs AS s ON al.id = s.album_id
    WHERE s.genres && ${genres} LIMIT 5;
    `;

    return rows;
  }

  static async findByIdWithAlbumsAndSongs(id: number) {
    const rows = await sql<
      (Artist & {
        album_id: number;
        album_title: string;
        album_release_date: string;
        album_cover: string;
        song_id: number;
        song_title: string;
        song_created_at: string;
        song_updated_at: string;
        song_cover: string;
        length: number;
      })[]
    >`
    SELECT 
    ar.*, 
    al.id as album_id, al.title as album_title, al.release_date as album_release_date, al.cover as album_cover,
    s.id as song_id, s.title as song_title, s.cover as song_cover, s.created_at as song_created_at, s.updated_at as song_updated_at, s.length
    FROM artists AS ar
    LEFT JOIN albums AS al ON al.artist_id = ar.id
    LEFT JOIN songs AS s ON s.album_id = al.id
    WHERE ar.id = ${id} ORDER BY album_release_date DESC;
    `;

    // Mappings
    const firstRow = rows[0];
    const artist: ArtistWithNestedAlbumsAndSongs = {
      ...firstRow,
      albums: [],
      songs: [],
    };

    const uniqueAlbums = new Map<number, Album>();

    for (let row of rows) {
      uniqueAlbums.set(row.album_id, {
        id: row.album_id,
        title: row.album_title,
        cover: row.album_cover,
        release_date: row.album_release_date,
      });
      artist.songs.push({
        id: row.song_id,
        title: row.song_title,
        length: row.length,
        cover: row.song_cover,
        created_at: row.song_created_at,
        updated_at: row.song_updated_at,
        album: row.album_title,
        artist: artist.nickname,
      });
    }

    artist.albums = Array.from(uniqueAlbums).map((entry) => entry[1]);
    artist.songs = artist.songs.slice(0, 10);

    return artist;
  }
}

export default ArtistsDao;
