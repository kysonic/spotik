import Heading from '@/components/ui/typography/Heading';

export type FormCardProps = {
  children: React.ReactNode;
  title?: string;
  onSubmit?: React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >['onSubmit'];
};

export default function FormCard({ children, title, onSubmit }: FormCardProps) {
  return (
    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        {title && <Heading>{title}</Heading>}
        <form className="space-y-7" onSubmit={onSubmit}>{children}</form>
      </div>
    </div>
  );
}
