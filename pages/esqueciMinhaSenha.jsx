import { useState } from "react";
import axios from "axios";

export default function EsqueciMinhaSenha() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleEmailForgotPass = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('O email deve ser inserido.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/lex/solicitar-recuperacao', {
                email_adv: email,
            });

            if (response.status === 200) {
                setSuccess('E-mail de recuperação enviado com sucesso!');
                setEmail('');
                setError('');
            } else {
                setError('Erro ao solicitar recuperação de senha. Código de status: ' + response.status);
            }
        } catch (error) {
            console.error('Erro ao enviar a requisição:', error.response ? error.response.data : error.message);
            setError('Erro ao enviar a requisição. Detalhes: ' + (error.response ? error.response.data.message : error.message));
        }
    }

    return (
        <>
            <h1>Esqueci minha senha</h1>
            <form onSubmit={handleEmailForgotPass}>
                <label htmlFor="email">Digite seu email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button type="submit">Enviar</button>
            </form>
        </>
    )
}
