import { Song, SongWithArtistAndAlbum } from '@/db/dao/Songs';
import HCard from '@/components/ui/cards/HCard';

export type SongColumnProps = {
  song: SongWithArtistAndAlbum;
};

export default function SongColumn({ song }: SongColumnProps) {
  return (
    <HCard
      className="hover:bg-transparent"
      key={`song-${song.id}`}
      title={song.title}
      cover={song.cover}
      subtitle={song.artist}
    />
  );
}
