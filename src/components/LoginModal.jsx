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
  useToast,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import useFTP from '../hooks/useFTP';

const LoginModal = ({ isOpen, onLogin, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useFTP();
  const toast = useToast();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={async (evt) => {
          evt.preventDefault();
          try {
            const { data: { token } } = await login(username, password);
            sessionStorage.setItem('token', token);
            onLogin(token);
            toast({
              title: 'Login succeeded',
              status: 'success',
              duration: 2000,
            });
          } catch (e) {
            toast({
              title: 'Login failed',
              description: 'You may have gotten your password wrong, or do not have an account.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          }
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
