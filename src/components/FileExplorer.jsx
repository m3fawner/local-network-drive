import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Spinner, Flex, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink,
} from '@chakra-ui/react';
import Image from 'next/image';
import useFTP from '../hooks/useFTP';

const TYPE_MAP = {
  DIRECTORY: 'd',
  FILE: '-',
};
const File = ({ type, name, selectDirectory }) => {
  const isDirectory = type === TYPE_MAP.DIRECTORY;
  return (
    <Flex direction="column" justify="center" align="center" p={8} onClick={isDirectory ? () => selectDirectory(name) : () => {}}>
      <Image src={isDirectory ? '/folder.svg' : '/file.svg'} height="60" width="60" />
      <Text>{name}</Text>
    </Flex>
  );
};
File.propTypes = {
  type: PropTypes.oneOf(Object.values(TYPE_MAP)).isRequired,
  name: PropTypes.string.isRequired,
  selectDirectory: PropTypes.func.isRequired,
};
const FileExplorer = () => {
  const [directory, setDirectory] = useState('');
  const [files, setFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { list } = useFTP();
  useEffect(() => {
    const loadFiles = async () => {
      const res = await list({ dir: directory });
      setFiles(res.data);
      setIsLoading(false);
    };
    setIsLoading(true);
    loadFiles();
  }, [directory, list]);

  const nestedDirectories = directory.split('/').slice(1);
  return isLoading ? <Spinner /> : (
    <Flex direction="column">
      {nestedDirectories.length > 0 && (
        <Breadcrumb>
          <BreadcrumbItem><BreadcrumbLink onClick={() => setDirectory('')}>home</BreadcrumbLink></BreadcrumbItem>
          {nestedDirectories.map((dir, i) => (
            <BreadcrumbItem isCurrentPage={i === nestedDirectories.length - 1} key={dir} onClick={() => setDirectory(`/${nestedDirectories.slice(0, i + 1).join('/')}`)}>
              <BreadcrumbLink>{dir}</BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      )}
      <Flex wrap="wrap">
        {files.map((file) => (<File key={file.name} {...file} selectDirectory={(dir) => setDirectory(`${directory}/${dir}`)} />))}
      </Flex>

    </Flex>
  );
};

export default FileExplorer;
