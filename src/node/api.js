import { verifyToken, decodeToken, getTokenFromHeader } from './jwt-util';
import { getClient } from './ftp';

export const produceAuthenticatedHandler = (handler) => (req, res) => {
  const token = getTokenFromHeader(req);
  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(401).json({ message: 'Unauthorized' });
    return null;
  }
  return handler(req, res, decoded);
};

export const produceAuthenticatedClientHandler = (handler) => async (req, res) => {
  const token = getTokenFromHeader(req);
  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(401).json({ message: 'Unauthorized' });
    return null;
  }
  const client = await getClient(decoded.guid);
  const handlerResponse = await handler(req, res, client, decoded);
  if (process.env.NODE_ENV === 'development') {
    client.end();
  }
  return handlerResponse;
};

export const produceOptionallyAuthenticatedHandler = (handler) => (req, res) => {
  const token = getTokenFromHeader(req);
  const decoded = decodeToken(token);
  return handler(req, res, decoded);
};
