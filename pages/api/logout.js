import { logout as ftpLogout, produceErrorResponseFromError } from '../../src/node/ftp';
import { produceOptionallyAuthenticatedHandler } from '../../src/node/api';

const logout = produceOptionallyAuthenticatedHandler(async (req, res, { guid }) => {
  try {
    await ftpLogout(guid);
    res.status(200).json({});
  } catch (e) {
    console.error(e);
    res.status(500).json(produceErrorResponseFromError(e));
  }
});

export default logout;
