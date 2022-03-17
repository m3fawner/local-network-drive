import axios from 'axios';
import { createRef } from 'react';
import { Button, Container } from '@chakra-ui/react';
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
    <Container as="form" ref={formRef} onSubmit={onSubmit}>
      <FileSelect label="Upload file" name="files" />
      <Button mt={6} type="submit" colorScheme="brand" w="full">Submit</Button>
    </Container>
  );
};

export default Uploader;
