'use client';

import { useEffect, useMemo, useState, Suspense } from 'react';
import Chips from '@/components/ui/forms/Chips';
import Button from '@/components/ui/forms/Button';
import saveUserGenres from '@/actions/users/saveUserGenres';
import { useFormState } from 'react-dom';
import Error from '@/components/ui/typography/Error';
import Loader from '@/components/ui/progress/Loader';

export type GenreSelectorProps = {
  Icon: React.ReactElement;
};

export default function ClientGenreSelector({ Icon }: GenreSelectorProps) {
  const [genres, setGenres] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>([]);
  const [state, formAction] = useFormState(saveUserGenres, { errors: null });

  useEffect(() => {
    const getGenres = async () => {
      const response = await fetch('/api/songs/genres');
      const json = await response.json();
      setGenres(json.genres);
    };

    getGenres();
  }, []);

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
        Icon,
      })),
    [genres, Icon]
  );

  return (
    <form action={formAction}>
      <div className="mt-4 max-w-[900px]">
        <Suspense fallback={<Loader />}>
          <Chips
            name="genres"
            items={items}
            value={value}
            onChange={onChange}
          />
        </Suspense>
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
