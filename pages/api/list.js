import instance from '../../src/node/ftp';

const list = async (req, res) => {
  try {
    const data = await new Promise((resolve, reject) => {
      instance.connect({
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        host: process.env.HOSTNAME,
      });
      instance.on('ready', () => {
        instance.list(`${process.env.ROOT_DIR}/${req.query.dir}`, (err, fileList) => {
          if (err) {
            reject(err);
          }
          resolve(fileList);
        });
      });
    });
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  } finally {
    instance.end();
  }
};

export default list;
