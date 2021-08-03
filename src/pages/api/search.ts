import * as StitcherAPI from 'src/server/lib/StitcherAPI';
import { NextApiHandler } from 'next';
import { ApiError } from 'next/dist/next-server/server/api-utils';

const api: NextApiHandler = async (req, res) => {
  const { query }: { query?: string } = req.query;
  if (query?.length) {
    const premiumShows = await StitcherAPI.getSearchPremiumShows(query).catch((error) => {
      return new ApiError(500, error);
    });
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.json(premiumShows);
  } else {
    const premiumShows = await StitcherAPI.getPremiumShows().catch((error) => {
      return new ApiError(500, error);
    });
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.json(premiumShows);
  }
};

export default api;
