import { createRef } from 'react';
import { Button, Container, useToast } from '@chakra-ui/react';
import useFTP from '../hooks/useFTP';
import FileSelect from './FileSelect';

const Uploader = (props) => {
  const formRef = createRef();
  const { upload } = useFTP();
  const toast = useToast();
  const onSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await upload(new FormData(formRef.current), {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: (progressEvt) => {
        // eslint-disable-next-line no-console
          console.log('Current progress:', Math.round((progressEvt.loaded * 100) / progressEvt.total));
        },
      });
      toast({
        title: 'Upload successful',
        status: 'success',
        duration: 3000,
      });
    } catch (e) {
      toast({
        title: 'Upload failed',
        description: e.message,
        duration: 3000,
        status: 'error',
      });
    }
  };
  return (
    <Container {...props} as="form" ref={formRef} onSubmit={onSubmit}>
      <FileSelect label="Upload file" name="files" />
      <Button mt={6} type="submit" colorScheme="brand" w="full">Submit</Button>
    </Container>
  );
};

export default Uploader;
