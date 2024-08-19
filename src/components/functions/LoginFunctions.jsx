import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from '../../context/UserContext';;

export default function LoginFunctions() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();
    const { setUserEmail } = useUser(); 

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
            });
            const { data } = response;

            if (data.success) {
                localStorage.setItem('user', JSON.stringify(data.user));
                setUserEmail(data.user.email_adv);

                if (data.user.role === 'admin') {
                    router.push('/adminDashboard');
                } else {
                    router.push('/userDashboard');
                }

                setEmail('');
                setSenha('');
            } else {
                setError('Verifique suas credenciais.');
                return;
            }
        } catch (error) {
            setError('Verifique suas credenciais ou tente novamente mais tarde.');
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
