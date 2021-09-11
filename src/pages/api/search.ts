import * as StitcherAPI from 'src/server/lib/StitcherAPI';
import { NextApiHandler } from 'next';
import { sendError } from 'next/dist/next-server/server/api-utils';
const api: NextApiHandler = async (req, res) => {
  try {
    const { query }: { query?: string } = req.query;
    if (query && query.trim().length) {
      const premiumShows = await StitcherAPI.getSearchPremiumShows(query);
      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
      return res.json(premiumShows);
    } else {
      const premiumShows = await StitcherAPI.getPremiumShows();
      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
      return res.json(premiumShows);
    }
  } catch(error: any) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

export default api;
