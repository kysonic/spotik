'use server';

import getBySearch from '@/db/commands/songs/getBySearch';
import { unstable_cache } from 'next/cache';

// Cache result for everybody
const getBySearchQuery = (query: string) => {
  return unstable_cache(async () => getBySearch(query), ['search', query], {
    tags: ['search'],
    revalidate: 30,
  });
};

export default getBySearchQuery;
