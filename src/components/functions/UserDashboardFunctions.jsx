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

    const [editField, setEditField] = useState(null);
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProcess, setSelectedProcess] = useState(null);

    const [numeroProcesso, setNumeroProcesso] = useState('');
    const [areaProcesso, setAreaProcesso] = useState('');
    const [statusProcesso, setStatusProcesso] = useState('');

    const handleClickReabrir = (processo) => {
        const updatedStatus = {
            ...processo,
            status_processo: 'em andamento',
        };
    
        setSelectedProcess(updatedStatus);
    
        axios.put(`http://localhost:3001/lex/processo/${processo.cod_processo}`, updatedStatus)
            .then(response => {
                console.log('Status do processo atualizado com sucesso!', response);
    
                setProcessos(prevProcessos =>
                    prevProcessos.map(p =>
                        p.cod_processo === updatedStatus.cod_processo ? updatedStatus : p
                    )
                );
            })
            .catch(error => {
                console.error('Erro ao atualizar o status do processo', error);
            });
    };

    const handleClickEditarWindow = (processo) => {
        setSelectedProcess(processo);
        setNumeroProcesso(processo.numero_processo || '');
        setAreaProcesso(processo.area_processo || '');
        setStatusProcesso(processo.status_processo || '');
        setModalEditOpen(true);
    }

    const handleClickEditar = (field) => {
        setEditField(field);
    }

    const handleChangeField = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleSaveEditClick = () => {
        setEditField(null);
        const updatedProcess = {
            ...selectedProcess,
            numero_processo: numeroProcesso,
            area_processo: areaProcesso,
            status_processo: statusProcesso,
        };
        setSelectedProcess(updatedProcess);

        axios.put(`http://localhost:3001/lex/processo/${selectedProcess.cod_processo}`, updatedProcess)
            .then(response => {
                console.log('Processo atualizado com sucesso!', response);

                setProcessos(prevProcessos =>
                    prevProcessos.map(processo =>
                        processo.cod_processo === updatedProcess.cod_processo ? updatedProcess : processo
                    )
                );
            })
            .catch(error => {
                console.error('Erro ao atualizar o processo', error);
            });
    };

    const handleCloseModalEdit = () => {
        setModalEditOpen(false);
        setSelectedProcess(null);
    }

    const handleClickConsultar = (processo) => {
        setSelectedProcess(processo);
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProcess(null);
    }

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

    return { nomeAdvogado, nomeEscritorio, userEmail, clientes, processos, setProcessos, loading, setLoading, error, editField, modalEditOpen, modalOpen, handleClickEditarWindow, handleClickEditar, handleChangeField, handleSaveEditClick, handleCloseModalEdit, handleClickConsultar, handleCloseModal, selectedProcess, numeroProcesso, setNumeroProcesso, areaProcesso, setAreaProcesso, statusProcesso, setStatusProcesso, handleClickReabrir };
}
