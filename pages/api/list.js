import { produceAuthenticatedClientHandler } from '../../src/node/api';

const list = produceAuthenticatedClientHandler(async (req, res, client) => {
  try {
    const data = await new Promise((resolve, reject) => {
      client.list(`${process.env.ROOT_DIR}/${req.query.dir}`, (err, fileList) => {
        if (err) {
          reject(err);
        }
        resolve(fileList);
      });
    });
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

export default list;
