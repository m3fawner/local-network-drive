import PropTypes from 'prop-types';
import '../styles/globals.css';

const App = ({ Component, pageProps }) => (<Component {...pageProps} />);
App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,

};

export default App;
