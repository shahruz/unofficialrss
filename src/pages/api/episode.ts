import { NextApiHandler } from 'next';
import { ApiError, sendError } from 'next/dist/next-server/server/api-utils';
import useAuth from 'src/server/lib/useAuth';

const api: NextApiHandler = async (req, res) => {
  const { id, u }: { id?: number; u?: string } = req.query;
  try {
    if (!id) throw new ApiError(400, 'Missing id.');
    if (!u) throw new ApiError(400, 'Missing token.');
    const user = await useAuth(u);

    const { url } = await fetch(
      `${process.env.API_BASE}/media/restricted/${id}.mp3?client=web`,
      {
        headers: { Authorization: `Bearer ${user.token?.id_token}` }
      }
    ).then(res => res.json());

    if (!url) throw new ApiError(404, `Can't find episode url.`);
    res.redirect(url);
  } catch (error: any) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

export default api;
