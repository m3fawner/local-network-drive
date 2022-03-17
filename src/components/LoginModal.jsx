import { useState } from 'react';
import PropTypes from 'prop-types';
import useFTP from '../hooks/useFTP';
import Modal from './Modal';

const LoginModal = ({ isOpen, onLogin, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useFTP();
  return (
    <Modal title="Login" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={async (evt) => {
        evt.preventDefault();
        const { data: { token } } = await login(username, password);
        onLogin(token);
      }}
      >
        <input type="text" value={username} onChange={({ target: { value } }) => setUsername(value)} />
        <input type="password" value={password} onChange={({ target: { value } }) => setPassword(value)} />
        <button type="submit">Login</button>
      </form>
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
