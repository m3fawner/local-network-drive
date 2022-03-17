import Client from 'ftp';

const instance = new Client();

instance.on('ready', () => {
  console.log('Launched FTP client, ready to connect!');
});

export default instance;