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

export const produceAuthenticatedClientHandler = (handler) => (req, res) => {
  const token = getTokenFromHeader(req);
  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(401).json({ message: 'Unauthorized' });
    return null;
  }
  return handler(req, res, getClient(decoded.guid), decoded);
};

export const produceOptionallyAuthenticatedHandler = (handler) => (req, res) => {
  const token = getTokenFromHeader(req);
  const decoded = decodeToken(token);
  return handler(req, res, decoded);
};
