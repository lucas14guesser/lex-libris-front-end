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

            const response = await axios.post('https://4b5a-2804-1530-106-e84e-87a-bf34-f900-b86c.ngrok-free.app/lex/auth/cadastro', {
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