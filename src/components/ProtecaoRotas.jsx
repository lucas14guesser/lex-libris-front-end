import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useUser();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const isPublicRoute = ['/', '/login', '/cadastro', '/esqueciMinhaSenha', '/confirmacaoEmail', '/paginaConfirmacao'].includes(router.pathname);

            if (isAuthenticated) {
                if (router.pathname === '/login' || router.pathname === '/cadastro') {
                    try {
                        await router.replace('/userDashboard');
                        return;
                    } catch (err) {
                        console.error('Redirecionamento falhou', err);
                    }
                }
            } else if (!isPublicRoute) {
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
    }, [isAuthenticated, router]);

    if (isChecking) {
        return <div>Redirecionando...</div>;
    }

    return children;
};

export default ProtectedRoute;
