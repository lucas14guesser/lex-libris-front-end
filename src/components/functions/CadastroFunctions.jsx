import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function CadastroFunction() {
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleCadastro = async (e) => {
        e.preventDefault();

        try {
            if (!cpf || !nome || !email || !senha || !confirmarSenha) {
                setError('Todos os campos são obrigatórios');
                return;
            }

            if (senha !== confirmarSenha) {
                setError('As senhas não coincidem');
                return;
            }

            const response = await axios.post('http://localhost:3001/lex/auth/cadastro', {
                cpf_adv: cpf,
                email_adv: email,
                senha_adv: senha,
                nome_adv: nome
            });

            if (response.status === 201) {
                setCpf('');
                setEmail('');
                setNome('');
                setSenha('');
                setConfirmarSenha('');
                router.push('/confirmacaoEmail');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Erro no cadastro. Verifique os dados e tente novamente.');
            }
            console.error('Erro no cadastro', error);
        }
    };

    return {
        cpf,
        setCpf,
        senha,
        setSenha,
        confirmarSenha,
        setConfirmarSenha,
        nome,
        setNome,
        email,
        setEmail,
        error,
        handleCadastro
    };
}