import instance from '../../src/ftp';

export default function handler(req, res) {
  instance.connect({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOSTNAME,
  });
  instance.on('ready', () => {
    instance.list(process.env.ROOT_DIR, (err, list) => {
      if (err) {
        console.error(err);
      }
      res.status(200).json(list)
      console.dir(list);
    });
  });
}