import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function LoginFunctions() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            if (!email || !senha)  {
                setError('É necessário preencher os campos para entrar')
                return;
            }

            const response = await axios.post('http://localhost:3001/lex/auth/login', {
                email_adv: email,
                senha_adv: senha
            });
            const { data } = response;

            if (data.success) {
                localStorage.setItem('user', JSON.stringify(data.user));

                if (data.user.role === 'admin') {
                    router.push('/adminDashboard');
                } else {
                    router.push('/userDashboard');
                }

                setEmail('');
                setSenha('');
            } else {
                setError('Login falhou. Verifique suas credenciais.');
                return;
            }
        } catch (error) {
            console.error('Erro no login', error);
            setError('Erro no login. Tente novamente.');
        }
    };
    
    return {
        email,
        setEmail,
        senha,
        setSenha,
        error,
        handleLogin
    }
}
