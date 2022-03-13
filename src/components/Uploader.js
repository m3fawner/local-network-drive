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
      onUploadProgress: (evt) => {
        console.log(`Current progress:`, Math.round((evt.loaded * 100) / evt.total));
      }
    }
    const response = await axios.post('/api/upload', new FormData(formRef.current), config);
    console.log('response', response.data);
  }
  return (
    <form ref={formRef} onSubmit={onSubmit} >
      <FileSelect className="w-1/2" label="Upload file" name="files" />
      <Button type="submit">Submit</Button>
    </form >
  )
};

export default Uploader;