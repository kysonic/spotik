import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import Input, { InputProps } from '@/components/ui/forms/Input';

export type FormInputProps<T extends FieldValues> = InputProps & {
  control: Control<T>;
  name: FieldPath<T>;
  serverError?: string;
};

export default function FormInput<T extends FieldValues>({
  control,
  name,
  serverError,
  ...props
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <Input
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
