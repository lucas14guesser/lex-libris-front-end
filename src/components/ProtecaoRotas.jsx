import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useUser();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            if (isLoading) return;

            const isPublicRoute = ['/', '/login', '/cadastro', '/esqueciMinhaSenha', '/confirmacaoEmail', '/paginaConfirmacao', '/cadastrarEscritorio', '/planos', '/404'].includes(router.pathname);

            if (isAuthenticated) {
                if (router.pathname === '/login' || router.pathname === '/cadastro') {
                    try {
                        await router.replace('/userDashboard');
                        return;
                    } catch (err) {
                        console.error('Redirecionamento falhou', err);
                    }
                } else {
                    setIsChecking(false);
                    return;
                }
            } 
            else if (!isAuthenticated && !isPublicRoute) {
                try {
                    await router.replace('/login');
                    return;
                } catch (err) {
                    console.error('Redirecionamento falhou', err);
                }
            }

            setIsChecking(false);
        };

        checkAuth();
    }, [isAuthenticated, isLoading, router.pathname]);

    if (isLoading || isChecking) {
        return <div>Carregando...</div>;
    }

    return children;
};

export default ProtectedRoute;
