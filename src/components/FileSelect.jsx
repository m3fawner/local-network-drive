import Image from 'next/image';
import { createRef } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Flex, FormControl, FormLabel, Input,
} from '@chakra-ui/react';

const FileSelect = ({ label, ...props }) => {
  const inputRef = createRef();
  const preventTheThings = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
  };
  const onDrop = (evt) => {
    preventTheThings(evt);
    const { dataTransfer: { files } } = evt;
    inputRef.current.files = files;
  };
  return (
    <Flex w="100%" direction="column" wrap="wrap" align="center">
      <Flex
        w="full"
        h="xs"
        border="1px"
        borderColor="gray.300"
        borderRadius="lg"
        direction="column"
        justify="center"
        align="center"
        onDrop={onDrop}
        onDragOver={preventTheThings}
        onDragEnter={preventTheThings}
        onDragLeave={preventTheThings}
      >
        <Image src="/files.svg" alt="Drag files here" width="48" height="48" />
        <Box mt={4}>Drag files here</Box>
      </Flex>
      <Box w="full" mt={6}>
        <FormControl mb={2}>
          <FormLabel htmlFor="formFile">
            {label}
          </FormLabel>
          <Input
            id="formFile"
            type="file"
            multiple
            ref={inputRef}
            {...props}
          />
        </FormControl>
      </Box>
    </Flex>
  );
};
FileSelect.propTypes = {
  label: PropTypes.node.isRequired,
};

export default FileSelect;
