import Client from 'ftp';

const connectedClients = new Map();
const getClient = (guid) => connectedClients.get(guid) ?? null;
export const login = async (guid, user, password) => {
  const client = new Client();
  client.connect({
    user,
    password,
    host: process.env.HOSTNAME,
  });
  return new Promise((resolve, reject) => {
    client.on('ready', (err) => {
      if (err) {
        reject(err);
      }
      connectedClients.set(guid, client);
      resolve();
    });
    client.on('error', reject);
  });
};
export const logout = async (guid) => {
  const client = getClient(guid);
  if (client) {
    client.end();
    return Promise.resolve();
  }
  return Promise.resolve();
};

const ERROR_CODES = {
  530: 'Login incorrect',
};

export const produceErrorResponseFromError = (e) => ({
  ...e,
  message: ERROR_CODES[e.code],
});
