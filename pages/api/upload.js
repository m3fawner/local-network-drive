import formidable from 'formidable';
import instance from '../../src/node/ftp';

const upload = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      const form = formidable({});
      form.parse(req, (err, _, { files }) => {
        if (err) {
          reject(err);
        }
        instance.connect({
          user: process.env.USERNAME,
          password: process.env.PASSWORD,
          host: process.env.HOSTNAME,
        });
        instance.on('ready', () => {
          instance.put(files.filepath, `${process.env.ROOT_DIR}/test/${files.originalFilename}`, (readyErr) => {
            if (readyErr) {
              reject(readyErr);
            }
            resolve();
          });
        });
      });
    });
    res.status(200).json({});
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  } finally {
    instance.end();
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default upload;
