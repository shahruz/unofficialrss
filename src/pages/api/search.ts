import * as StitcherAPI from 'src/server/lib/StitcherAPI';
import { NextApiHandler } from 'next';

const api: NextApiHandler = async (req, res) => {
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
};

export default api;
