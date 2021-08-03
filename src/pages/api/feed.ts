import { NextApiHandler } from 'next';
import { ApiError } from 'next/dist/next-server/server/api-utils';
import generateFeed from 'src/server/lib/generateFeed';
import * as StitcherAPI from 'src/server/lib/StitcherAPI';
import useAuth from 'src/server/lib/useAuth';

const api: NextApiHandler = async (req, res) => {
  const { id, u }: { id?: number; u?: string } = req.query;
  try {
    if (!id) throw 'Invalid feed id.';
    if (!u) throw 'Missing token.';
    let feedDetails;
    try {
      feedDetails = await StitcherAPI.getFeedDetails(id, true);
    } catch (error) {
      throw 'Unable to retrieve podcast from Stitcher.';
    }
    const { podcast, episodes } = feedDetails;
    let user;
    try {
      user = await useAuth(u);
    } catch (error) {
      throw new ApiError(500, error);
    }
    let feed = generateFeed({ podcast, episodes, user, token: u });
    res.setHeader('Content-Type', 'application/rss+xml');
    res.setHeader(
        'Cache-Control',
        `s-maxage=${60 * 15}, stale-while-revalidate`
    );
    return res.send(feed);
  } catch (error) {
    throw new ApiError(500, error);
  }
};

export default api;
