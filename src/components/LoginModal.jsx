import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import useFTP from '../hooks/useFTP';

const LoginModal = ({ isOpen, onLogin, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useFTP();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={async (evt) => {
          evt.preventDefault();
          const { data: { token } } = await login(username, password);
          onLogin(token);
        }}
        >
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input id="username" type="text" value={username} onChange={({ target: { value } }) => setUsername(value)} />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input id="password" type="password" value={password} onChange={({ target: { value } }) => setPassword(value)} />
            </FormControl>
            <ModalFooter>
              <Button type="submit" colorScheme="brand">Login</Button>
            </ModalFooter>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
};
LoginModal.propTypes = {
  isOpen: PropTypes.bool,
  onLogin: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
LoginModal.defaultProps = {
  isOpen: false,
};

export default LoginModal;
