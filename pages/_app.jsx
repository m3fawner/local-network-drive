import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const colors = {
  brand: {
    900: '#081f32',
    800: '#0a243a',
    700: '#0b2941',
    600: '#24425a',
    500: '#3d576d',
    400: '#556c7f',
    300: '#6d8191',
    200: '#8696a4',
    100: '#9eabb6',
  },
};

const theme = extendTheme({ colors });
const App = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
);
App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,

};

export default App;
