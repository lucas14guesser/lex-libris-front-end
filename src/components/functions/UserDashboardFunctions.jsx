import { useState, useEffect } from "react";
import axios from 'axios';
import { useUser } from '../../context/UserContext';

export default function useUserDashboard() {
    const { userEmail } = useUser();
    const [nomeAdvogado, setNomeAdvogado] = useState('');
    const [nomeEscritorio, setNomeEscritorio] = useState('');
    const [clientes, setClientes] = useState([]);
    const [processos, setProcessos] = useState([]);

    useEffect(() => {
        const fetchDadosAdvogado = async () => {
            if (!userEmail) return;
            try {
                const encodedEmail = encodeURIComponent(userEmail);
                const response = await axios.get(`http://localhost:3001/lex/advogado/email/${encodedEmail}`)
                if (response.data?.result) {
                    const nomeAdv = response.data.result.nome_adv;
                    if (nomeAdv) {
                        setNomeAdvogado(nomeAdv);
                    } else {
                        console.error('Resposta da API não contém "nome_adv".');
                    }
                } else {
                    console.error('Resposta da API não contém resultados.');
                }
            } catch (error) {
                console.error('Erro ao buscar o nome do advogado:', error);
            }
        };

        const fetchDadosEscritorio = async () => {
            if (!userEmail) return;
            try {
                const encodedEmail = encodeURIComponent(userEmail);
                const response = await axios.get(`http://localhost:3001/lex/escritorio/advogado/${encodedEmail}`)
                if (response.data?.result?.length > 0) {
                    const primeiroEscritorio = response.data.result[0];
                    if (primeiroEscritorio?.nome_escritorio) {
                        setNomeEscritorio(primeiroEscritorio.nome_escritorio);
                    } else {
                        console.error('Resposta da API não contém "nome_escritorio".');
                    }
                } else {
                    console.error('Resposta da API não contém resultados ou está vazia.');
                }
            } catch (error) {
                console.error('Erro ao buscar o nome do escritório:', error);
            }
        };

        const fetchDadosClientes = async () => {
            try {
                const response = await axios.get('http://localhost:3001/lex/clientes');
                if (response.data?.result?.length > 0) {
                    setClientes(response.data.result);
                    
                    const clienteEnvolvs = response.data.result.map(cliente => cliente.cpf);
                    const processos = await Promise.all(clienteEnvolvs.map(cpf => {
                        return axios.get(`http://localhost:3001/lex/processo/cliente/${cpf}`)
                            .then(response => response.data.result || []);
                    }));
                    setProcessos(processos.flat());
                } else {
                    console.error('Resposta da API não contém dados válidos.');
                }
            } catch (error) {
                console.error('Erro ao buscar os clientes:', error);
            }
        };

        fetchDadosAdvogado();
        fetchDadosEscritorio();
        fetchDadosClientes();
    }, [userEmail]);

    return { nomeAdvogado, nomeEscritorio, userEmail, clientes, processos };
}
