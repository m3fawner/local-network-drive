import formidable from 'formidable';
import { produceAuthenticatedClientHandler } from '../../src/node/api';

const upload = produceAuthenticatedClientHandler(async (req, res, client) => {
  try {
    await new Promise((resolve, reject) => {
      const form = formidable({});
      form.parse(req, (err, _, { files }) => {
        if (err) {
          reject(err);
        }
        client.put(files.filepath, `${process.env.ROOT_DIR}/test/${files.originalFilename}`, (readyErr) => {
          if (readyErr) {
            reject(readyErr);
          }
          resolve();
        });
      });
    });
    res.status(200).json({});
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default upload;
