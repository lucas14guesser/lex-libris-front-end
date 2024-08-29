import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from '../../context/UserContext';

export default function LoginFunctions() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();
    const { setUserEmail, setIsAuthenticated } = useUser(); 

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            if (!email || !senha) {
                setError('É necessário preencher os campos para entrar');
                return;
            }
    
            const response = await axios.post('http://localhost:3001/lex/auth/login', {
                email_adv: email,
                senha_adv: senha
            }, { withCredentials: true });
    
            const { data } = response;
    
            if (data.success) {
                setUserEmail(data.user.email_adv);
                setIsAuthenticated(true);

                if (data.user.role === 'admin') {
                    router.push('/adminDashboard');
                } else {
                    router.push('/userDashboard');
                }

                setEmail('');
                setSenha('');
            } else {
                setError('Verifique suas credenciais.');
            }
        } catch (error) {
            console.error('Login error:', error); 
            setError('Erro ao realizar login. Verifique suas credenciais ou tente novamente mais tarde.');
        }
    };

    return {
        email,
        setEmail,
        senha,
        setSenha,
        error,
        handleLogin
    };
}
