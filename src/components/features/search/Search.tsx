'use client';

import Input from '@/components/ui/forms/Input';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebounce } from 'react-use';
import Loader from '@/components/ui/progress/Loader';

export default function Search() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [, cancel] = useDebounce(
    () => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (query) {
        newSearchParams.set('query', query);
      } else {
        newSearchParams.delete('query');
      }

      router.replace(`${pathname}?${newSearchParams}`);
      setIsLoading(false);
    },
    2000,
    [query]
  );

  useEffect(() => {
    if (query) {
      setIsLoading(true);
    }
  }, [query]);

  return (
    <div className="w-full">
      <div className="p-4 flex gap-1 items-center">
        <Input
          className="w-full sm:w-[520px]"
          placeholder="Enter your search query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          hideError
        />
        {isLoading && <Loader />}
      </div>
    </div>
  );
}
