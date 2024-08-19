import { useState, useEffect } from "react";
import axios from 'axios';
import { useUser } from '../../context/UserContext';

export default function useUserDashboard() {
    const { userEmail } = useUser();
    const [nomeAdvogado, setNomeAdvogado] = useState('');
    const [nomeEscritorio, setNomeEscritorio] = useState('');

    useEffect(() => {
        const fetchDadosAdvogado = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/lex/advogado/${userEmail}`);
                const nomeAdv = response.data && response.data.result && response.data.result.nome_adv;
                if (nomeAdv) {
                    setNomeAdvogado(nomeAdv);
                } else {
                    console.error('Resposta da API não contém "nome_adv".');
                }
            } catch (error) {
                console.error('Erro ao buscar o nome do advogado:', error);
            }
        };

        const fetchDadosEscritorio = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/lex/escritorio/${userEmail}`);
                if (response.data && response.data.result && response.data.result.length > 0) {
                    const primeiroEscritorio = response.data.result[0];
                    if (primeiroEscritorio && primeiroEscritorio.nome_escritorio) {
                        setNomeEscritorio(primeiroEscritorio.nome_escritorio);
                    } else {
                        console.error('Resposta da API não contém "nome_escritorio".');
                    }
                } else {
                    console.error('Resposta da API não contém dados válidos.');
                }
            } catch (error) {
                console.error('Erro ao buscar o nome do escritório:', error);
            }
        };

        fetchDadosAdvogado();
        fetchDadosEscritorio();
    }, [userEmail]);

    return { nomeAdvogado, nomeEscritorio, userEmail };
}
