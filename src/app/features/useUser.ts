import { getLoginLink } from 'src/server/lib/StitcherAuth';
import useSWR from 'swr';

const useUser = (): { isPremium: boolean; token: string } | null => {
  const { data } = useSWR('/api/is-premium');
  return data;
};

export const login = () => {
  location.href = getLoginLink();
};

export const logout = () => {
  document.cookie = 'token=;Max-Age=0;';
  location.href = '/';
};

export default useUser;
