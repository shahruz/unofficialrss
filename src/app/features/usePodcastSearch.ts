import useSWR from 'swr';
import Podcast from 'src/types/Podcast';
import useDebounce from './useDebounce';

const usePodcastSearch = (searchTerm: string) => {
  const debouncedTerm = useDebounce(searchTerm, 250);
  const { data: podcasts }: { data?: Podcast[] } = useSWR(
    debouncedTerm ? `/api/search?query=${debouncedTerm}` : null
  );
  return podcasts;
};

export default usePodcastSearch;
