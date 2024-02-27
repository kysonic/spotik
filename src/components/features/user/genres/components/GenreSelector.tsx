'use client';

import { useMemo, useState } from 'react';
import Chips from '@/components/ui/forms/Chips';
import VolumeIcon from '@/components/ui/icons/VolumeIcon';
import Button from '@/components/ui/forms/Button';
import saveUserGenres from '@/actions/users/saveUserGenres';
import { useFormState } from 'react-dom';
import Error from '@/components/ui/typography/Error';

export type GenreSelectorProps = {
  genres: string[];
};

export default function GenreSelector({ genres }: GenreSelectorProps) {
  const [value, setValue] = useState<string[]>([]);
  const [state, formAction] = useFormState(saveUserGenres, { errors: null });

  const onChange = (title: string) => {
    if (value.includes(title)) {
      return setValue(value.filter((v) => v !== title));
    }

    return setValue([...value, title]);
  };

  const items = useMemo(
    () =>
      genres.map((title) => ({
        title,
        Icon: <VolumeIcon />,
      })),
    [genres]
  );

  return (
    <form action={formAction}>
      <div className="mt-4 max-w-[900px]">
        <Chips name="genres" items={items} value={value} onChange={onChange} />
        {state.errors && (
          <div className="mt-4">
            <Error>{state.errors.genres?.join(',')}</Error>
          </div>
        )}
        <div className="flex items-center justify-center w-full mt-4">
          <Button disabled={!value.length}>Save</Button>
        </div>
      </div>
    </form>
  );
}
