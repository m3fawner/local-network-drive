import { useState } from 'react';
import Modal from './Modal';
import Uploader from './Uploader';

const Home = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <button onClick={() => setLoginOpen(true)}>Open</button>
      <Uploader />
      <Modal isOpen={loginOpen} onClose={() => setLoginOpen(false)} title="Modal title">Modal</Modal>
    </>
  );
}

export default Home;