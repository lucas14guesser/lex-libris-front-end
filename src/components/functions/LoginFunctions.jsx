import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function LoginFunctions() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
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
                alert('Login falhou. Verifique suas credenciais.');
            }
        } catch (error) {
            console.error('Erro no login', error);
            alert('Erro no login. Tente novamente.');
        }
    };
    return {
        email,
        setEmail,
        senha,
        setSenha,
        handleLogin
    }
}
