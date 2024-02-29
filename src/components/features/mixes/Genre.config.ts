export const GENRE_STYLE_CONFIG = {
  Rock: {
    className: 'bg-green-800',
    imageClassName: 'from-green-500 to-blue-300 via-none',
    bg: 'from-green-100',
  },
  Metal: {
    className: 'bg-red-800',
    imageClassName: 'from-red-500 to-pink-300 via-none',
    bg: 'from-red-100',
  },
  Electronic: {
    className: 'bg-blue-800',
    imageClassName: 'from-blue-500 to-slate-300 via-none',
    bg: 'from-blue-100',
  },
  'Non Music': {
    className: 'bg-slate-800',
    imageClassName: 'from-slate-500 to-green-300 via-none',
    bg: 'from-slate-100',
  },
  Funk: {
    className: 'bg-yellow-800',
    imageClassName: 'from-yellow-500 to-blue-300 via-none',
    bg: 'from-yellow-100',
  },
  Pop: {
    className: 'bg-purple-800',
    imageClassName: 'from-purple-500 to-blue-300 via-none',
    bg: 'from-purple-100',
  },
  'Hip Hop': {
    className: 'bg-indigo-800',
    imageClassName: 'from-indigo-500 to-green-300 via-none',
    bg: 'from-indigo-100',
  },
  Jazz: {
    className: 'bg-gray-800',
    imageClassName: 'from-gray-500 to-slate-300 via-none',
    bg: 'from-gray-100',
  },
  Classical: {
    className: 'bg-slate-800',
    imageClassName: 'from-slate-500 to-red-300 via-none',
    bg: 'from-slate-100',
  },
  Rap: {
    className: 'bg-blue-800',
    imageClassName: 'from-blue-500 to-slate-300 via-none',
    bg: 'from-blue-100',
  },
};

export type GenreStyleConfig = keyof typeof GENRE_STYLE_CONFIG;
