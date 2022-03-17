import { logout as ftpLogout, produceErrorResponseFromError } from '../../src/node/ftp';
import { getTokenFromHeader, decodeToken } from '../../src/node/jwt-util';

const logout = async (req, res) => {
  const token = getTokenFromHeader(req);
  if (token === null) {
    res.status(200).json({});
    return;
  }
  try {
    const { guid } = decodeToken(token);
    await ftpLogout(guid);
    res.status(200).json({});
  } catch (e) {
    console.error(e);
    res.status(500).json(produceErrorResponseFromError(e));
  }
};

export default logout;
