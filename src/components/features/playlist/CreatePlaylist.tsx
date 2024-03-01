'use client';

import { useRef } from 'react';
import PlayIcon from '@/components/ui/icons/PlayIcon';
import Subheading from '@/components/ui//typography/Subheading';
import { twMerge } from 'tailwind-merge';
import Button from '@/components/ui/forms/Button';
import { useFormState } from 'react-dom';
import createPlaylistAction from '@/actions/playlists/createPlaylist';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createPlaylistSchema,
  CreatePlaylistSchema,
} from '@/validation/playlist';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormInput from '@/components/forms/FormInput';
import FormTextarea from '@/components/forms/FormTextarea';

export type CreatePlaylistProps = {
  className?: string;
  imageClassName?: string;
};

// Example of how to combine client validation with forms and server actions
export default function CreatePlaylist({
  className,
  imageClassName,
}: CreatePlaylistProps) {
  const [state, formAction] = useFormState(createPlaylistAction, {
    errors: null,
  });

  const { control, handleSubmit } = useForm<CreatePlaylistSchema>({
    resolver: zodResolver(createPlaylistSchema),
  });

  const onSubmit: SubmitHandler<CreatePlaylistSchema> = (values) => {
    formRef.current?.submit();
  };

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={formAction} onSubmit={handleSubmit(onSubmit)}>
      <div
        className={twMerge(
          'flex gap-6 w-full p-4 bg-gradient-to-t from-slate-100 to-slate-100',
          className
        )}
      >
        <div
          className={twMerge(
            'w-[154px] h-[154px] hidden sm:flex items-center justify-center rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
            imageClassName
          )}
        >
          <PlayIcon className="text-white w-10 h-10" />
        </div>
        <div className="flex flex-col gap-1 sm:gap-2 w-[560px]">
          <Subheading className="text-start text-xs">
            Private playlist
          </Subheading>
          <div className="flex flex-col gap-1">
            <FormInput
              control={control}
              className="max-w-60"
              name="title"
              placeholder="Enter your playlist title"
              serverError={state.errors?.title?.join(',')}
            />
            <FormTextarea
              control={control}
              className="max-h-[62px] max-w-80"
              name="description"
              placeholder="Enter your playlist description"
              serverError={state.errors?.title?.join(',')}
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
