import { useMedia } from 'react-use';

// TODO: Get breakpoints from tailwind
export const useBreakpoints = () => {
  const isMobile = useMedia('(max-width: 480px)');

  return { isMobile };
};
