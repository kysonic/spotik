'use client';

import PlayIcon from '@/components/ui/icons/PlayIcon';
import Subheading from '@/components/ui//typography/Subheading';
import { twMerge } from 'tailwind-merge';
import Input from '@/components/ui/forms/Input';
import Textarea from '@/components/ui/forms/Textarea';
import Button from '@/components/ui/forms/Button';
import { useFormState } from 'react-dom';
import createPlaylistAction from '@/actions/playlists/createPlaylist';

export type CreatePlaylistProps = {
  className?: string;
  imageClassName?: string;
};

export default function CreatePlaylist({
  className,
  imageClassName,
}: CreatePlaylistProps) {
  const [state, formAction] = useFormState(createPlaylistAction, { errors: null });

  // TODO: Add client validation with useHook form, 
  // TODO: Add redirection on adding songs in playlist after

  return (
    <form action={formAction}>
      <div
        className={twMerge(
          'flex gap-6 w-full p-4 bg-gradient-to-t from-slate-100 to-slate-100',
          className
        )}
      >
        <div
          className={twMerge(
            'rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
            imageClassName
          )}
        >
          <div className="w-[140px] h-[140px] flex items-center justify-center">
            <PlayIcon className="text-white w-10 h-10" />
          </div>
        </div>
        <div className="flex flex-col gap-1 sm:gap-2 w-full">
          <Subheading className="text-start text-xs">
            Private playlist
          </Subheading>
          <div className="flex flex-col gap-2">
            <Input
              className="max-w-60"
              name="title"
              placeholder="Enter your playlist title"
              error={state.errors?.title?.join(',')}
            />
            <Textarea
              className="max-h-[62px] max-w-80"
              name="description"
              placeholder="Enter your playlist description"
              error={state.errors?.description?.join(',')}
            />
          </div>
        </div>
      </div>
      <div className="px-4 py-0">
        <Button>Create</Button>
      </div>
    </form>
  );
}
