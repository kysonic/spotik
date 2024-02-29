import sql from '../client';
import { SongWithArtistAndAlbum } from './Songs';

export type Like = {
  id: number;
  user_id: number;
  song_id: number;
};

export type InsertLikeArgs = Omit<Like, 'id'>;
export type UpdateLikesArgs = InsertLikeArgs;

class LikesDao {
  static async find() {
    const rows = await sql`SELECT * FROM likes;`;

    return rows;
  }

  static async findById(id: number) {
    const rows = await sql`SELECT * FROM likes WHERE id = ${id};`;

    return rows[0];
  }

  static async getUserSongs(id: number) {
    const rows = await sql<(Like & SongWithArtistAndAlbum)[]>`
    SELECT l.*, s.*, al.title as album, nickname as artist FROM likes AS l 
    FULL JOIN songs as s ON s.id = l.song_id
    LEFT JOIN albums as al ON al.id = s.album_id
    LEFT JOIN artists as ar ON ar.id = al.artist_id
    WHERE user_id = ${id} ORDER BY l.created_at DESC;`;

    return rows;
  }

  static async findByUserAndSongIds(user_id: number, song_id: number) {
    const rows = await sql<
      Like[]
    >`SELECT * FROM likes WHERE user_id = ${user_id} AND song_id = ${song_id};`;

    return rows[0];
  }

  static async insert(fields: InsertLikeArgs) {
    const rows = await sql<Like[]>`INSERT INTO likes ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} RETURNING *`;

    return rows[0];
  }

  static async update(id: number, fields: UpdateLikesArgs) {
    const rows = await sql<Like[]>`UPDATE likes SET ${sql(
      fields,
      Object.keys(fields) as unknown as Readonly<keyof typeof fields>
    )} WHERE id = ${id} RETURNING *`;

    return rows[0];
  }

  static async delete(id: number) {
    const rows = await sql<
      Like[]
    >`DELETE FROM likes WHERE id = ${id} RETURNING *;`;

    return rows[0];
  }

  static async count() {
    const rows = await sql<{ count: string }[]>`SELECT COUNT(*) FROM likes;`;

    return parseInt(rows[0].count);
  }
}

export default LikesDao;
