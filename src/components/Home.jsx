import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/react';
import useFTP, { TokenContext } from '../hooks/useFTP';
import LoginModal from './LoginModal';
import Uploader from './Uploader';

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
  return (
    <TokenContext.Provider value={token}>
      {token === null
        ? <Button type="button" colorScheme="brand" onClick={() => setLoginOpen(true)}>Login</Button> : <LogoutButton onLogout={() => setToken(null)} />}
      <Uploader />
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
