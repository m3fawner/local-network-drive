import { disconnectAll as ftpDisconnectAll, produceErrorResponseFromError } from '../../src/node/ftp';
import { getTokenFromHeader } from '../../src/node/jwt-util';

const disconnectAll = async (req, res) => {
  if (getTokenFromHeader(req) === null) {
    res.status(401).json({});
    return;
  }
  try {
    await ftpDisconnectAll();
    res.status(200).json({});
  } catch (e) {
    res.status(500).json(produceErrorResponseFromError(e));
  }
};

export default disconnectAll;
