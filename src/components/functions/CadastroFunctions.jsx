import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function CadastroFunction() {
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleCadastro = async (e) => {
        e.preventDefault();

        try {
            if (!cpf || !nome || !senha) {
                setError('Todos os campos são obrigatórios');
                return;
            }

            const response = await axios.post('http://localhost:3001/lex/auth/cadastro', {
                cpf_adv: cpf,
                senha_adv: senha,
                nome_adv: nome
            });

            if (response.status === 201) {
                alert('Cadastro realizado com sucesso!');
                setCpf('');
                setNome('');
                setSenha('');
                router.push('/user-dashboard');
            }
        } catch (error) {
            console.error('Erro no cadastro', error);
            setError('Erro no cadastro. Verifique os dados e tente novamente.');
        }
    };

    return {
        cpf,
        setCpf,
        senha,
        setSenha,
        nome,
        setNome,
        error,
        handleCadastro
    };
}