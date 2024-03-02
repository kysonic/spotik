import SelectSongButton from '../components/SelectSongButton';

export type NumberColumnProps = {
  id: number;
  index: number;
};

export default function NumberColumn({ id, index }: NumberColumnProps) {
  return (
    <div key={`id-${id}`}>
      <div className="block group-hover:hidden">{(index + 1).toString()}</div>
      <div className="hidden group-hover:block">
        <SelectSongButton key={`select-${id}`} id={id} />
      </div>
    </div>
  );
}
