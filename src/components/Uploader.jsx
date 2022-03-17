import axios from 'axios';
import { createRef } from 'react';
import Button from './Button';
import FileSelect from './FileSelect';

const Uploader = () => {
  const formRef = createRef();
  const onSubmit = async (evt) => {
    evt.preventDefault();
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (progressEvt) => {
        // eslint-disable-next-line no-console
        console.log('Current progress:', Math.round((progressEvt.loaded * 100) / progressEvt.total));
      },
    };
    await axios.post('/api/upload', new FormData(formRef.current), config);
  };
  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <FileSelect className="w-1/2" label="Upload file" name="files" />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Uploader;
