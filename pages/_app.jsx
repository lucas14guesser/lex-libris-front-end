import React from 'react';
import { GlobalStyle } from '../src/theme/GlobalStyles';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
