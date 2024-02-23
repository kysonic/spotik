import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import Input, { InputProps } from '@/components/ui/forms/Input';

export type FormInputProps<T extends FieldValues> = InputProps & {
  control: Control<T>;
  name: FieldPath<T>;
};

export default function FormInput<T extends FieldValues>({
  control,
  name,
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
            error={error?.message}
            {...props}
          />
        );
      }}
    />
  );
}
