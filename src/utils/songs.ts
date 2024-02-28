import { Song } from '@/db/dao/Songs';
import {
  intervalToDuration,
  formatDistance,
  format,
  addSeconds,
} from 'date-fns';

export const countPlaylistLength = (songs: Song[]) =>
  songs.reduce((acc, song) => acc + (song.length ?? 0), 0);

export const formatSongLength = (length: number) =>
  format(addSeconds(new Date(0), length ?? 0), 'mm:ss');

export const formatSongReleaseDate = (date: string | Date) =>
  formatDistance(date ?? new Date(), new Date(), {
    addSuffix: true,
  });
