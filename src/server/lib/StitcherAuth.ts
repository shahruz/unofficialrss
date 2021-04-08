import { Token } from 'src/server/models/User';
import JWT from 'jwt-simple';

export const getLoginLink = () =>
  `https://${process.env.NEXT_PUBLIC_AWS_OAUTH_DOMAIN}/login?response_type=code&client_id=${process.env.NEXT_PUBLIC_APP_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_AWS_OAUTH_REDIRECT}&scope=openid`;

export const getToken = async (code: string) => {
  const body = new URLSearchParams();
  body.append('grant_type', 'authorization_code');
  body.append('code', code);
  body.append(
    'redirect_uri',
    process.env.NEXT_PUBLIC_AWS_OAUTH_REDIRECT as string
  );
  body.append('client_id', process.env.NEXT_PUBLIC_APP_CLIENT_ID as string);
  body.append('client_secret', process.env.APP_CLIENT_SECRET as string);
  const token: Token = await fetch(
    `https://${process.env.NEXT_PUBLIC_AWS_OAUTH_DOMAIN}/token`,
    {
      method: 'post',
      body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  ).then(res => res.json());
  const currentTokenDecoded = JWT.decode(token.access_token, '', true);
  const { sub: stitcherID } = JWT.decode(token.id_token, '', true);
  return {
    stitcherID,
    token,
    isPremium: !!currentTokenDecoded['cognito:groups']?.includes('Premium')
  };
};

export const refreshAccessToken = async (refreshToken: string) => {
  const body = new URLSearchParams();
  body.append('grant_type', 'refresh_token');
  body.append('refresh_token', refreshToken);
  body.append(
    'redirect_uri',
    process.env.NEXT_PUBLIC_AWS_OAUTH_REDIRECT as string
  );
  body.append('client_id', process.env.NEXT_PUBLIC_APP_CLIENT_ID as string);
  body.append('client_secret', process.env.APP_CLIENT_SECRET as string);
  const token: Token = await fetch(
    `https://${process.env.NEXT_PUBLIC_AWS_OAUTH_DOMAIN}/token`,
    {
      method: 'post',
      body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  ).then(res => res.json());
  return { access_token: token.access_token, id_token: token.id_token };
};
