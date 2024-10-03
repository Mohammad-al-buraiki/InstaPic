import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
const styles = {
  global: props => ({
    body: {
      bg: mode('gray.100', '#111')(props),
      color: mode('gray.800', 'whiteAlpha.900')(props)
    }
  })
};
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

const theme = extendTheme({ config, styles });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </I18nextProvider>
    </BrowserRouter>
  </StrictMode>
);
