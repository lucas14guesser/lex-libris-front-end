import React from 'react';
import { GlobalStyle } from '../src/theme/GlobalStyles';
import { UserProvider } from '@/context/UserContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}

export default MyApp;
