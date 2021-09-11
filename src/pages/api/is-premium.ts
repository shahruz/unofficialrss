import { NextApiHandler } from 'next';
import { ApiError, sendError } from 'next/dist/next-server/server/api-utils';
import useAuth from 'src/server/lib/useAuth';

const api: NextApiHandler = async (req, res) => {
  const { token }: { token?: string } = req.cookies;
  if (!token) return res.send(new ApiError(403, 'Missing token.'));
  try {
    const user = await useAuth(token);
    return res.json({ isPremium: user.isPremium, token });
  } catch (error: any) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

export default api;
