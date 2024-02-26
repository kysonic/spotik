import Link from "next/link";

export type IconLinkProps = {
  Icon: React.ReactNode;
  title: string;
  href: string;
}

export default function IconLink({ Icon, title, href }: IconLinkProps) {
  return (
    <Link href={href}>
      <div className="flex items-center justify-start hover:underline">
        {Icon}
        <div className="ml-2 text text-lg leading-4 pt-1">{title}</div>
      </div>
    </Link>
  )
}