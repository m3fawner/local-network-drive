import formidable from 'formidable';
import instance from '../../src/ftp';

const upload = (req, res) => {
  const form = formidable({});
  try {
    form.parse(req, (err, fields, { files }) => {
      instance.connect({
        user: process.env.USER,
        password: process.env.PASSWORD,
        host: process.env.HOSTNAME,
      });
      instance.on('ready', () => {
        instance.put(files.filepath, `${process.env.ROOT_DIR}/test/${files.originalFilename}`, (err) => {
          if (err) {
            console.error(err);
            instance.end();
            throw err;
          }
          instance.end();
        });
        res.status(200).json({});
      });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

export const config = {
  api: {
    bodyParser: false,
  }
}

export default upload;