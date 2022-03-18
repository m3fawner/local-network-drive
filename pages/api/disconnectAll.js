import { disconnectAll as ftpDisconnectAll, produceErrorResponseFromError } from '../../src/node/ftp';
import { produceAuthenticatedHandler } from '../../src/node/api';

const disconnectAll = produceAuthenticatedHandler(async (req, res) => {
  try {
    await ftpDisconnectAll();
    res.status(200).json({});
  } catch (e) {
    res.status(500).json(produceErrorResponseFromError(e));
  }
});

export default disconnectAll;
