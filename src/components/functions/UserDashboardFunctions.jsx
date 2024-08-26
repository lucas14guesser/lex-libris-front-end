import { useState, useEffect } from "react";
import axios from 'axios';
import { useUser } from '../../context/UserContext';

export default function userDashboardFunctions() {
    const { userEmail } = useUser();
    const [nomeAdvogado, setNomeAdvogado] = useState('');
    const [nomeEscritorio, setNomeEscritorio] = useState('');
    const [clientes, setClientes] = useState([]);
    const [processos, setProcessos] = useState([]);

    useEffect(() => {
        const fetchDados = async () => {
            if (!userEmail) return;
            try {
                const encodedEmail = encodeURIComponent(userEmail);

                const config = {
                    withCredentials: true
                };

                const responseAdvogado = await axios.get(`http://localhost:3001/lex/advogado/email/${encodedEmail}`, config);
                if (responseAdvogado.data?.result?.nome_adv) {
                    setNomeAdvogado(responseAdvogado.data.result.nome_adv);
                } else {
                    console.error('Erro ao buscar o nome do advogado.');
                }

                const responseEscritorio = await axios.get(`http://localhost:3001/lex/escritorio/advogado/${encodedEmail}`, config);
                if (responseEscritorio.data?.result?.length > 0) {
                    const primeiroEscritorio = responseEscritorio.data.result[0];
                    if (primeiroEscritorio?.nome_escritorio && primeiroEscritorio?.telefone_escritorio) {
                        setNomeEscritorio(primeiroEscritorio.nome_escritorio);

                        const responseClientes = await axios.get(`http://localhost:3001/lex/cliente/escritorio/${primeiroEscritorio.telefone_escritorio}`, config);
                        if (responseClientes.data?.result?.length > 0) {
                            setClientes(responseClientes.data.result);

                            const clienteEnvolvs = responseClientes.data.result.map(cliente => cliente.cpf);
                            const processos = await Promise.all(clienteEnvolvs.map(cpf => {
                                return axios.get(`http://localhost:3001/lex/processo/cliente/${cpf}`, config)
                                    .then(response => response.data.result || []);
                            }));
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
            }
        };

        fetchDados();
    }, [userEmail]);

    return { nomeAdvogado, nomeEscritorio, userEmail, clientes, processos };
}
