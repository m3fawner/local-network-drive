import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Alert, AlertIcon, Box, Button, Flex, Container,
} from '@chakra-ui/react';
import useFTP, { TokenContext } from '../hooks/useFTP';
import LoginModal from './LoginModal';
import Uploader from './Uploader';
import FileExplorer from './FileExplorer';

// useFTP hook must be evaluated as a child of the context provider
const LogoutButton = ({ onLogout }) => {
  const { logout } = useFTP();
  return (
    <Button
      type="button"
      onClick={async () => {
        await logout();
        onLogout();
      }}
      colorScheme="red"
    >
      Logout
    </Button>
  );
};
LogoutButton.propTypes = {
  onLogout: PropTypes.func.isRequired,
};
const Home = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(sessionStorage.getItem('token'));
  }, []);
  return (
    <TokenContext.Provider value={token}>
      <Box h="60px" w="full" backgroundColor="brand.100">
        <Container h="full" maxW="container.xl">
          <Flex h="full" justify="end" align="center">
            {token === null
              ? <Button type="button" colorScheme="brand" onClick={() => setLoginOpen(true)}>Login</Button> : (
                <LogoutButton onLogout={() => {
                  setToken(null);
                  sessionStorage.removeItem('token');
                }}
                />
              )}
          </Flex>
        </Container>
      </Box>
      <Container maxW="container.xl" pt={4}>
        {token === null ? (
          <Alert status="info">
            <AlertIcon />
            {' '}
            You are not logged in. Log in via the &quot;Login&quot; button in the top right.
          </Alert>
        ) : (
          <Flex direction="column">
            <FileExplorer />
            <Uploader />
          </Flex>
        )}
      </Container>
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={(newToken) => {
          setToken(newToken);
          setLoginOpen(false);
        }}
      />
    </TokenContext.Provider>
  );
};

export default Home;
