import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function RedefinirSenha() {
    const router = useRouter();
    const { token } = router.query;
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRedefinirSenha = async (e) => {
        e.preventDefault();

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
            console.error('Erro ao enviar a requisição:', error.response ? error.response.data : error.message);
            setError('Erro ao enviar a requisição. Detalhes: ' + (error.response ? error.response.data.message : error.message));
        }
    }

    return (
        <>
            <h1>Redefinir Senha</h1>
            <form onSubmit={handleRedefinirSenha}>
                <label htmlFor="novaSenha">Digite sua nova senha</label>
                <input
                    type="password"
                    id="novaSenha"
                    placeholder="Digite sua nova senha"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                />
                <label htmlFor="confirmarNovaSenha">Confirme sua nova senha</label>
                <input
                    type="password"
                    id="confirmarNovaSenha"
                    placeholder="Confirme sua nova senha"
                    value={confirmarNovaSenha}
                    onChange={(e) => setConfirmarNovaSenha(e.target.value)}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button type="submit">Redefinir Senha</button>
            </form>
        </>
    );
}
