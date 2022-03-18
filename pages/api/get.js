import { produceAuthenticatedClientHandler } from '../../src/node/api';

const get = produceAuthenticatedClientHandler(async (req, res, client) => {
  const filename = req.query.file;
  try {
    client.get(`${process.env.ROOT_DIR}/${filename}`, async (err, file) => {
      if (err) {
        throw err;
      }
      console.log(file);
      res.status(200);
      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
      res.setHeader('Content-Type', `application/${filename.split('.').slice(-1)}`);
      res.send(file);
    });
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

export default get;
