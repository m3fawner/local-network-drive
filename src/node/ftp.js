import Client from 'ftp';

const connectedClients = new Map();
export const login = async (guid, user, password) => {
  const client = new Client();
  client.connect({
    user,
    password,
    host: process.env.FTP_HOSTNAME,
  });
  return new Promise((resolve, reject) => {
    client.on('ready', (err) => {
      if (err) {
        reject(err);
      }
      connectedClients.set(guid, client);
      resolve(client);
    });
    client.on('error', reject);
  });
};
export const getClient = async (guid) => (process.env.NODE_ENV === 'development'
  ? login('', process.env.FTP_USERNAME, process.env.PASSWORD) : connectedClients.get(guid) ?? null);
export const logout = async (guid) => {
  const client = await getClient(guid);
  if (client) {
    client.end();
    return Promise.resolve();
  }
  return Promise.resolve();
};

const ERROR_CODES = {
  421: 'Too many users are connected',
  530: 'Login incorrect',
};

export const produceErrorResponseFromError = (e) => ({
  ...e,
  message: ERROR_CODES[e.code],
});

export const disconnectAll = async () => Promise.all(connectedClients.keys().map(logout));
