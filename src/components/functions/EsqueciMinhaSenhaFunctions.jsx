import { useState } from "react";
import axios from "axios";

export default function EsqueciMinhaSenhaFunctions() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleEmailForgotPass = async (e) => {
        e.preventDefault();

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
            setError(error.response ? error.response.data.message : error.message);
        }
    }

    return {
       email,
       setEmail,
       error,
       success,
       handleEmailForgotPass
    };
}

