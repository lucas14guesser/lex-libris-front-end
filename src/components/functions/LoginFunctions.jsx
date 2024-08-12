import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function LoginFunctions() {
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/lex/auth/login', {
                cpf_adv: cpf,
                senha_adv: senha
            });
            const { data } = response;

            if (data.success) {
                localStorage.setItem('user', JSON.stringify(data.user));

                if (data.user.role === 'admin') {
                    router.push('/admin-dashboard');
                } else {
                    router.push('/user-dashboard');
                }

                setCpf('');
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
        cpf,
        setCpf,
        senha,
        setSenha,
        handleLogin
    }
}
