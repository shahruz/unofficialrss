import { NextApiHandler } from 'next';
import { ApiError, sendError } from 'next/dist/next-server/server/api-utils';
import generateFeed from 'src/server/lib/generateFeed';
import * as StitcherAPI from 'src/server/lib/StitcherAPI';
import useAuth from 'src/server/lib/useAuth';

const api: NextApiHandler = async (req, res) => {
  const { id, u }: { id?: number; u?: string } = req.query;
  try {
    if (!id) throw new ApiError(400, 'Missing feed id.');
    if (!u) throw new ApiError(400, 'Missing token.');
    let feedDetails;
    try {
      feedDetails = await StitcherAPI.getFeedDetails(id, true);
    } catch (error: any) {
      return sendError(res, 404, 'Unable to retrieve podcast from Stitcher.');
    }
    const { podcast, episodes } = feedDetails;
    let user;
    try {
      user = await useAuth(u);
    } catch (error: any) {
      return sendError(res, error.statusCode || 400, error.message);
    }
    const feed = generateFeed({ podcast, episodes, user, token: u });
    res.setHeader('Content-Type', 'application/rss+xml');
    res.setHeader(
      'Cache-Control',
      `s-maxage=${60 * 15}, stale-while-revalidate`
    );
    return res.send(feed);
  } catch (error: any) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

export default api;
