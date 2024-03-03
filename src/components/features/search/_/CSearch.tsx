'use client';

import Input from '@/components/ui/forms/Input';
import { useEffect, useState, cloneElement, createContext } from 'react';
import { useDebounce } from 'react-use';
import Loader from '@/components/ui/progress/Loader';

export type CSearchProps = {
  children: React.ReactElement;
};

export const QueryContext = createContext({ query: '' });

export default function CSearch({ children }: CSearchProps) {
  const [query, setQuery] = useState('');
  const [deferredQuery, setDeferredQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [, cancel] = useDebounce(
    () => {
      setDeferredQuery(query);
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
      {/* https://stackoverflow.com/questions/76708590/how-can-i-pass-props-from-parent-component-client-to-child-component-server */}
      {/* {cloneElement(children, { query: deferredQuery })} */}
      <QueryContext.Provider value={{query: deferredQuery}} >
        {children}
      </QueryContext.Provider>
    </div>
  );
}
