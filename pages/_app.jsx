import React from 'react';
import { GlobalStyle } from '../src/theme/GlobalStyles';
import { UserProvider } from '@/context/UserContext';
import ProtectedRoute from '@/components/ProtecaoRotas';
import Navbar from '@/components/layout/navbar/Navbar';
import Footer from '@/components/layout/footer/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <UserProvider>
        <ProtectedRoute publicRoutes={['/', '/login', '/cadastro', '/esqueciMinhaSenha', '/confirmacaoEmail', '/paginaConfirmacao', '/cadastrarEscritorio', '/planos', '/404']}>
          <Component {...pageProps} />
        </ProtectedRoute>
      </UserProvider>
      <Footer />
    </>
  );
}

export default MyApp;
