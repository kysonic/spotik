export type FormCardProps = {
  children: React.ReactNode;
}

export default function FormCard({ children }: FormCardProps) {
  return (
    <form className="container mx-auto w-[500px] xs:w-full min-h-[300px] rounded p-6 flex flex-col justify-center gap-2 bg-gray-100 shadow-md border border-gray-200">
      {children}
    </form>
  )
}