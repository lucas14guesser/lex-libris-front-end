import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function RedefinirSenhaFunction() {
    const router = useRouter();
    const { token } = router.query;
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRedefinirSenha = async (e) => {
        e.preventDefault();

        if(!novaSenha || !confirmarNovaSenha) {
            setError('Os campos de senha precisam ser preenchidos');
            return;
        }

        if (!novaSenha || novaSenha !== confirmarNovaSenha) {
            setError('As senhas devem coincidir.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3001/lex/redefinir-senha?token_recuperacao=${token}`, {
                senha_adv: novaSenha,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

            if (response.status === 200) {
                setSuccess('Senha redefinida com sucesso!');
                setNovaSenha('');
                setConfirmarNovaSenha('');
                setError('');
                router.push('/login');
            } else {
                setError('Erro ao redefinir a senha. Código de status: ' + response.status);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Erro ao redefinir nova senha.');
            }
            console.error('Erro ao redefinir nova senha', error);
        }
    }


    return {
        novaSenha,
        setNovaSenha,
        confirmarNovaSenha,
        setConfirmarNovaSenha,
        error,
        success,
        handleRedefinirSenha
    }
}