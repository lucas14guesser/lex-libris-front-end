import ModalAgendamentos from '@/components/functions/ModalAgendamentos';
import useUserDashboard from '@/components/functions/UserDashboardFunctions';
import { BotaoSubmit, Container, FontBold, LinkBackToDashboard, Subtitulo, Titulo } from '@/theme/GlobalStyles';
import {
    BtnBuscaProcesso,
    ContainerInputBtnBuscaProcesso,
    InputBuscaProcesso,
    DescricaoTd,
    FuncoesListaProcessos,
    BotoesListaProcesso,
    BotaoEditIcone,
    ListaProcessos,
    TdListaProcessos,
    ModalInternalContainer,
    DivFlexButtonSubmit,
    StyledSelect,
    StyledOption,
} from '@/theme/UserDashboardTheme';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import ModalEditAgendamentos from '@/components/functions/ModalEditAgendamentos';

function Agendamentos() {
    const { clientes, agendamentos, telefoneEscritorio } = useUserDashboard();
    const [funcionarios, setFuncionarios] = useState([]);
    const [funcionariosMap, setFuncionariosMap] = useState(new Map());
    const clientesMap = new Map(clientes.map(cliente => [cliente.cpf, { nome: cliente.nome, telefone: cliente.telefone }]));
    const [busca, setBusca] = useState('');
    const [resultadosBusca, setResultadosBusca] = useState([]);
    const [modalEditAgendamentosOpen, setModalEditAgendamentosOpen] = useState(false);
    const [modalAgendamentosOpen, setModalAgendamentosOpen] = useState(false);
    const [selectedAgendamento, setSelectedAgendamento] = useState(null);
    const [selectedFuncionario, setSelectedFuncionario] = useState('');

    useEffect(() => {
        const fetchFuncionarios = async () => {
            if (!telefoneEscritorio) {
                console.error("Telefone do escritório não está definido.");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3001/lex/funcionario/${telefoneEscritorio}`);
                if (Array.isArray(response.data.result)) {
                    setFuncionarios(response.data.result);
                    setFuncionariosMap(new Map(response.data.result.map(func => [func.id_funcionario, func.nome_funcionario])));
                } else {
                    console.error("A resposta da API não contém um array em 'result':", response.data);
                }
            } catch (error) {
                console.error("Erro ao buscar funcionários:", error);
            }
        };

        fetchFuncionarios();
    }, [telefoneEscritorio]);

    const formatarData = (data) => {
        if (!data) return '';
        const dataObj = new Date(data);
        if (isNaN(dataObj)) return '';

        const dia = String(dataObj.getUTCDate()).padStart(2, '0');
        const mes = String(dataObj.getUTCMonth() + 1).padStart(2, '0');
        const ano = dataObj.getUTCFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    const buscarAgendamentosPorCliente = () => {
        if (busca.trim() === '') {
            setResultadosBusca([]);
            return;
        }

        const resultados = agendamentos.filter(agendamento => {
            const cliente = clientesMap.get(agendamento.cliente_envolv);
            return cliente && cliente.nome.toLowerCase().includes(busca.toLowerCase());
        });
        setResultadosBusca(resultados);
    };

    const handleCloseModalAgendamentos = () => {
        setModalAgendamentosOpen(false);
        setSelectedAgendamento(null);
    };

    const handleOpenModalAgendamentos = (agendamento) => {
        setSelectedAgendamento(agendamento);
        setModalAgendamentosOpen(true);
    };

    const handleCloseModalEditAgendamentos = () => {
        setModalEditAgendamentosOpen(false);
    };

    const handleOpenModalEditAgendamentos = (agendamento) => {
        setSelectedAgendamento(agendamento);
        setSelectedFuncionario(agendamento.nome_funcionario || '');
        setModalEditAgendamentosOpen(true);
    };

    const salvarEdicaoAgendamento = async () => {
        if (selectedAgendamento && selectedFuncionario) {
            const funcionario = funcionarios.find(func => func.nome_funcionario === selectedFuncionario);
            if (!funcionario) {
                alert('Funcionário selecionado não foi encontrado!');
                return;
            }

            const idFuncionario = funcionario.id_funcionario;

            try {
                await axios.put(`http://localhost:3001/lex/agendamento/front/${selectedAgendamento.cod_agendamento}/${idFuncionario}`);

                const agendamentosAtualizados = agendamentos.map(agendamento => {
                    if (agendamento.cod_agendamento === selectedAgendamento.cod_agendamento) {
                        return { ...agendamento, nome_funcionario: funcionario.nome_funcionario, id_funcionario: idFuncionario };
                    }
                    return agendamento;
                });

                setResultadosBusca(agendamentosAtualizados);
                setSelectedAgendamento(prev => ({ ...prev, nome_funcionario: funcionario.nome_funcionario, id_funcionario: idFuncionario }));
                setModalEditAgendamentosOpen(false);
                alert('Funcionário adicionado ao agendamento com sucesso!');
            } catch (error) {
                console.error("Erro ao salvar edição do agendamento:", error);
                alert('Erro ao salvar a edição do agendamento. Tente novamente.');
            }
        } else {
            alert('Selecione um funcionário antes de salvar!');
        }
    };

    const agendamentosExibidos = resultadosBusca.length > 0 ? resultadosBusca : agendamentos;

    return (
        <React.Fragment>
            <LinkBackToDashboard href='/userDashboard'>
                <FaArrowLeft />
                Voltar ao Painel do usuário
            </LinkBackToDashboard>
            <Container>
                <Head>
                    <title>Lex Libris - Agendamentos Realizados</title>
                </Head>
                <Titulo style={{ marginBottom: '2rem' }}>Agendamentos Realizados</Titulo>
                <ContainerInputBtnBuscaProcesso>
                    <InputBuscaProcesso
                        type="text"
                        name="buscaAgendamento"
                        id="buscaAgendamento"
                        placeholder="Nome do cliente que deseja buscar..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                    <BtnBuscaProcesso onClick={buscarAgendamentosPorCliente}>
                        <FaSearch />
                    </BtnBuscaProcesso>
                </ContainerInputBtnBuscaProcesso>

                {agendamentosExibidos.length > 0 ? (
                    <ListaProcessos>
                        <table>
                            <thead>
                                <tr>
                                    <th>Cliente</th>
                                    <th>Data</th>
                                    <th>Hora</th>
                                    <th>Funcionário</th>
                                    <th>Funções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {agendamentosExibidos.map(agendamento => {
                                    const cliente = clientesMap.get(agendamento.cliente_envolv);
                                    const nomeFuncionario = funcionariosMap.get(agendamento.id_funcionario) || 'N/D';
                                    return (
                                        <tr key={agendamento.cod_agendamento}>
                                            <TdListaProcessos style={{ width: '35%' }}>{cliente ? cliente.nome : 'Nome não encontrado'}</TdListaProcessos>
                                            <DescricaoTd style={{ width: '20%' }}>{formatarData(agendamento.data_agendamento)}</DescricaoTd>
                                            <DescricaoTd style={{ width: '20%' }}>{agendamento.hora_agendamento}</DescricaoTd>
                                            <DescricaoTd>{nomeFuncionario}</DescricaoTd>
                                            <FuncoesListaProcessos>
                                                <BotoesListaProcesso>
                                                    <BotaoEditIcone onClick={() => handleOpenModalEditAgendamentos(agendamento)}>
                                                        Editar
                                                    </BotaoEditIcone>
                                                    <BotaoEditIcone onClick={() => handleOpenModalAgendamentos(agendamento)}>
                                                        Consultar
                                                    </BotaoEditIcone>
                                                </BotoesListaProcesso>
                                            </FuncoesListaProcessos>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </ListaProcessos>
                ) : (
                    <p>Nenhum agendamento encontrado.</p>
                )}

                {modalAgendamentosOpen && selectedAgendamento && (
                    <ModalAgendamentos onClose={handleCloseModalAgendamentos}>
                        <Subtitulo>Detalhes do Agendamento</Subtitulo>
                        <ModalInternalContainer>
                            <p><FontBold>Código do Agendamento:</FontBold> {selectedAgendamento.cod_agendamento}</p>
                            <p><FontBold>Cliente:</FontBold> {clientesMap.get(selectedAgendamento.cliente_envolv)?.nome || 'N/D'}</p>
                            <p><FontBold>Data:</FontBold> {formatarData(selectedAgendamento.data_agendamento)}</p>
                            <p><FontBold>Hora:</FontBold> {selectedAgendamento.hora_agendamento}</p>
                            <p><FontBold>Funcionário:</FontBold> {funcionariosMap.get(selectedAgendamento.id_funcionario) || 'N/D'}</p>
                        </ModalInternalContainer>
                    </ModalAgendamentos>
                )}

                {modalEditAgendamentosOpen && selectedAgendamento && (
                    <ModalEditAgendamentos>
                        <Subtitulo>Editar Agendamento</Subtitulo>
                        <ModalInternalContainer>
                            <p><FontBold>Código do Agendamento:</FontBold> {selectedAgendamento.cod_agendamento}</p>
                            <p><FontBold>Cliente:</FontBold> {clientesMap.get(selectedAgendamento.cliente_envolv)?.nome || 'N/D'}</p>
                            <p><FontBold>Funcionário Atual:</FontBold> {funcionariosMap.get(selectedAgendamento.id_funcionario) || 'N/D'}</p>
                            <label htmlFor="funcionarioSelect">Selecione um funcionário:</label>
                            <StyledSelect
                                id="funcionarioSelect"
                                value={selectedFuncionario}
                                onChange={(e) => setSelectedFuncionario(e.target.value)}
                            >
                                <StyledOption value="" disabled>Selecione um funcionário</StyledOption>
                                {funcionarios.map(func => (
                                    <option key={func.id_funcionario} value={func.nome_funcionario}>
                                        {func.nome_funcionario}
                                    </option>
                                ))}
                            </StyledSelect>
                            <DivFlexButtonSubmit>
                                <BotaoSubmit onClick={salvarEdicaoAgendamento}>Salvar</BotaoSubmit>
                                <BotaoSubmit onClick={handleCloseModalEditAgendamentos}>Fechar</BotaoSubmit>
                            </DivFlexButtonSubmit>
                        </ModalInternalContainer>
                    </ModalEditAgendamentos>
                )}
            </Container>
        </React.Fragment>
    );
}

export default Agendamentos;
