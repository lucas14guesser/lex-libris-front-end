import React from 'react';
import { GlobalStyle } from '../src/theme/GlobalStyles';
import { UserProvider } from '@/context/UserContext';
import ProtectedRoute from '@/components/ProtecaoRotas';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <UserProvider>
        <ProtectedRoute publicRoutes={['/', '/login', '/cadastro', '/esqueciMinhaSenha']}>
          <Component {...pageProps} />
        </ProtectedRoute>
      </UserProvider>
    </>
  );
}

export default MyApp;
