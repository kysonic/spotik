import { UserButton } from '@clerk/nextjs';
import GlobalNavigation from '@/components/features/global/navigation/Navigation';

export default function TopNav() {
  return (
    <div className="flex justify-between items-center h-full px-4 py-2 rounded-t-md bg-slate-100">
      <GlobalNavigation />
      <UserButton />
    </div>
  )
}