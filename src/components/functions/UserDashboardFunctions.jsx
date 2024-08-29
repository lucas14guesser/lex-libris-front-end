import { useState, useEffect } from "react";
import axios from 'axios';
import { useUser } from '../../context/UserContext';

export default function useUserDashboard() {
    const { userEmail } = useUser();
    const [nomeAdvogado, setNomeAdvogado] = useState('');
    const [nomeEscritorio, setNomeEscritorio] = useState('');
    const [clientes, setClientes] = useState([]);
    const [processos, setProcessos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDados = async () => {
            if (!userEmail) return;

            setLoading(true);
            setError(null);

            try {
                const encodedEmail = encodeURIComponent(userEmail);
                const config = { withCredentials: true };

                const [responseAdvogado, responseEscritorio] = await Promise.all([
                    axios.get(`http://localhost:3001/lex/advogado/email/${encodedEmail}`, config),
                    axios.get(`http://localhost:3001/lex/escritorio/advogado/${encodedEmail}`, config),
                ]);

                if (responseAdvogado.data?.result?.nome_adv) {
                    setNomeAdvogado(responseAdvogado.data.result.nome_adv);
                } else {
                    console.error('Erro ao buscar o nome do advogado.');
                }

                if (responseEscritorio.data?.result?.length > 0) {
                    const primeiroEscritorio = responseEscritorio.data.result[0];
                    if (primeiroEscritorio?.nome_escritorio && primeiroEscritorio?.telefone_escritorio) {
                        setNomeEscritorio(primeiroEscritorio.nome_escritorio);

                        const responseClientes = await axios.get(`http://localhost:3001/lex/cliente/escritorio/${primeiroEscritorio.telefone_escritorio}`, config);
                        if (responseClientes.data?.result?.length > 0) {
                            setClientes(responseClientes.data.result);

                            const clienteEnvolvs = responseClientes.data.result.map(cliente => cliente.cpf);
                            const processosPromises = clienteEnvolvs.map(cpf =>
                                axios.get(`http://localhost:3001/lex/processo/cliente/${cpf}`, config)
                                    .then(response => response.data.result || [])
                            );
                            const processos = await Promise.all(processosPromises);
                            setProcessos(processos.flat());
                        } else {
                            console.error('Erro ao buscar os clientes.');
                        }
                    } else {
                        console.error('Erro ao buscar o nome ou telefone do escritório.');
                    }
                } else {
                    console.error('Erro ao buscar o escritório.');
                }
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                setError('Erro ao buscar dados. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchDados();
    }, [userEmail]);

    return { nomeAdvogado, nomeEscritorio, userEmail, clientes, processos, loading, setLoading, error };
}
