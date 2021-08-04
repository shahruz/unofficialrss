import * as StitcherAPI from 'src/server/lib/StitcherAPI';
import { NextApiHandler } from 'next';
import { ApiError } from 'next/dist/next-server/server/api-utils';
const api: NextApiHandler = async (req, res) => {
  try {
    const { query }: { query?: string } = req.query;
    if (query?.length) {
      const premiumShows = await StitcherAPI.getSearchPremiumShows(query);
      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
      return res.json(premiumShows);
    } else {
      const premiumShows = await StitcherAPI.getPremiumShows();
      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
      return res.json(premiumShows);
    }
  } catch(error) {
    return Promise.reject(new ApiError(500, error));
  }
};

export default api;
