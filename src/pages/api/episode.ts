import { NextApiHandler } from 'next';
import { ApiError } from 'next/dist/next-server/server/api-utils';
import useAuth from 'src/server/lib/useAuth';

const api: NextApiHandler = async (req, res) => {
  const { id, u }: { id?: number; u?: string } = req.query;
  try {
    if (!id) throw 'Invalid episode id.';
    if (!u) throw 'Missing token.';
    const user = await useAuth(u);

    const { url } = await fetch(
      `${process.env.API_BASE}/media/restricted/${id}.mp3?client=web`,
      {
        headers: { Authorization: `Bearer ${user.token?.id_token}` }
      }
    ).then(res => res.json());

    if (!url) throw new Error('Missing episode url.');
    res.redirect(url);
  } catch (error) {
    return res.send(new ApiError(500, error));
  }
};

export default api;
