import { v4 as uuid } from 'uuid';
import { login as ftpLogin, produceErrorResponseFromError } from '../../src/node/ftp';
import { verifyToken, getTokenFromHeader, generateToken } from '../../src/node/jwt-util';

const login = async (req, res) => {
  const token = getTokenFromHeader(req);
  if (verifyToken(token)) {
    res.status(200).json({
      token,
    });
    return;
  }
  try {
    const guid = uuid();
    const { user, password } = req.body;
    await ftpLogin(guid, user, password);
    res.status(200).json({
      token: generateToken(guid),
    });
  } catch (e) {
    console.error(e);
    res.status(500).json(produceErrorResponseFromError(e));
  }
};

export default login;
