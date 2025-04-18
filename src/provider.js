import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    error: '#DA1A32',
    success: '#3FD75B',
  },
});

export const Provider = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
