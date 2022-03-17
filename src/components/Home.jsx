import { useState } from 'react';
import PropTypes from 'prop-types';
import useFTP, { TokenContext } from '../hooks/useFTP';
import LoginModal from './LoginModal';
import Uploader from './Uploader';

// useFTP hook must be evaluated as a child of the context provider
const LogoutButton = ({ onLogout }) => {
  const { logout } = useFTP();
  return (
    <button
      type="button"
      onClick={async () => {
        await logout();
        onLogout();
      }}
    >
      Logout
    </button>
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
      <LogoutButton onLogout={() => setToken(null)} />
      <button type="button" onClick={() => setLoginOpen(true)}>Login</button>
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
