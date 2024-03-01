import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import Textarea, { TextareaProps } from '@/components/ui/forms/Textarea';

export type FormTextareaProps<T extends FieldValues> = TextareaProps & {
  control: Control<T>;
  name: FieldPath<T>;
  serverError?: string;
};

export default function FormTextarea<T extends FieldValues>({
  control,
  name,
  serverError,
  ...props
}: FormTextareaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <Textarea
            value={value || ''}
            onChange={onChange}
            error={serverError ?? error?.message}
            name={name}
            {...props}
          />
        );
      }}
    />
  );
}
