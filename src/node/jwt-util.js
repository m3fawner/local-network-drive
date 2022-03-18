import jwt from 'jsonwebtoken';

export const getTokenFromHeader = (req) => {
  if (req.query.token) {
    return req.query.token;
  }
  const [, ...parts] = (req.headers['www-authorization'] ?? '').split(' ');
  if (parts.length === 0) {
    return null;
  }
  return parts.join(' ');
};

export const verifyToken = (token) => (token ? jwt.verify(token, process.env.SECRET_KEY) : null);

export const decodeToken = verifyToken;

export const generateToken = (guid) => jwt.sign({
  guid,
}, process.env.SECRET_KEY);
