import { NextApiHandler } from 'next';
import connectDB from 'src/server/db';
import { getToken } from 'src/server/lib/StitcherAuth';
import User from 'src/server/models/User';
import JWT from 'jwt-simple';

const api: NextApiHandler = async (req, res) => {
  const { code }: { code?: string } = req.query;
  try {
    if (!code) throw 'Invalid code.';
    const user = await getToken(code);
    await connectDB();
    const dbUser = await User.findOneAndUpdate(
      { stitcherID: user.stitcherID },
      user,
      { new: true, upsert: true }
    );
    const token = JWT.encode(
      { _id: dbUser._id },
      process.env.JWT_KEY as string
    );
    res.setHeader(
      'Set-Cookie',
      `token=${token}; Max-Age=${60 * 60 * 24 * 365}; Path=/;`
    );
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default api;
