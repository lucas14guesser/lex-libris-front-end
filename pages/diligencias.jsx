import ModalDiligencias from '@/components/functions/ModalDiligencias';
import useUserDashboard from '@/components/functions/UserDashboardFunctions';
import {
    BotaoSubmit,
    Container,
    FontBold,
    LinkBackToDashboard,
    Subtitulo,
    Titulo,
} from '@/theme/GlobalStyles';
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
import ModalEditDiligencias from '@/components/functions/ModalEditDiligencias';

function Diligencias() {
    const { clientes, diligencias, telefoneEscritorio } = useUserDashboard();
    const [funcionarios, setFuncionarios] = useState([]);
    const [funcionariosMap, setFuncionariosMap] = useState(new Map());
    const clientesMap = new Map(clientes.map(cliente => [cliente.cpf, { nome: cliente.nome, telefone: cliente.telefone }]));
    const [busca, setBusca] = useState('');
    const [resultadosBusca, setResultadosBusca] = useState([]);
    const [modalEditDiligenciasOpen, setModalEditDiligenciasOpen] = useState(false);
    const [modalDiligenciasOpen, setModalDiligenciasOpen] = useState(false);
    const [selectedDiligencia, setSelectedDiligencia] = useState(null);
    const [selectedFuncionario, setSelectedFuncionario] = useState('');

    const formatarData = (data) => {
        if (!data) return '';
        const dataObj = new Date(data);
        if (isNaN(dataObj)) return '';

        const dia = String(dataObj.getUTCDate()).padStart(2, '0');
        const mes = String(dataObj.getUTCMonth() + 1).padStart(2, '0');
        const ano = dataObj.getUTCFullYear();
        return `${dia}/${mes}/${ano}`;
    };

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

    const buscarDiligenciasPorCliente = () => {
        if (busca.trim() === '') {
            setResultadosBusca([]);
            return;
        }

        const resultados = diligencias.filter(diligencia => {
            const cliente = clientesMap.get(diligencia.cliente_envolv);
            return cliente && cliente.nome.toLowerCase().includes(busca.toLowerCase());
        });
        setResultadosBusca(resultados);
    };

    const handleCloseModalDiligencias = () => {
        setModalDiligenciasOpen(false);
        setSelectedDiligencia(null);
    };

    const handleOpenModalDiligencias = (diligencia) => {
        setSelectedDiligencia(diligencia);
        setModalDiligenciasOpen(true);
    };

    const handleCloseModalEditDiligencias = () => {
        setModalEditDiligenciasOpen(false);
    };

    const handleOpenModalEditDiligencias = (diligencia) => {
        setSelectedDiligencia(diligencia);
        setSelectedFuncionario(diligencia.nome_funcionario || '');
        setModalEditDiligenciasOpen(true);
    };

    const salvarEdicaoDiligencia = async () => {
        if (selectedDiligencia && selectedFuncionario) {
            const funcionario = funcionarios.find(func => func.nome_funcionario === selectedFuncionario);
            if (!funcionario) {
                alert('Funcionário selecionado não foi encontrado!');
                return;
            }

            const idFuncionario = funcionario.id_funcionario;

            try {
                await axios.put(`http://localhost:3001/lex/diligencia/front/${selectedDiligencia.cod_diligencia}/${idFuncionario}`);

                const diligenciasAtualizadas = diligencias.map(diligencia => {
                    if (diligencia.cod_diligencia === selectedDiligencia.cod_diligencia) {
                        return { ...diligencia, nome_funcionario: funcionario.nome_funcionario, id_funcionario: idFuncionario };
                    }
                    return diligencia;
                });

                setResultadosBusca(diligenciasAtualizadas);
                setSelectedDiligencia(prev => ({ ...prev, nome_funcionario: funcionario.nome_funcionario, id_funcionario: idFuncionario }));
                setModalEditDiligenciasOpen(false);
                alert('Funcionário adicionado à diligência com sucesso!');
            } catch (error) {
                console.error("Erro ao salvar edição da diligência:", error);
                alert('Erro ao salvar a edição da diligência. Tente novamente.');
            }
        } else {
            alert('Selecione um funcionário antes de salvar!');
        }
    };

    const diligenciasExibidas = resultadosBusca.length > 0 ? resultadosBusca : diligencias;

    return (
        <React.Fragment>
            <LinkBackToDashboard href='/userDashboard'>
                <FaArrowLeft />
                Voltar ao Painel do usuário
            </LinkBackToDashboard>
            <Container>
                <Head>
                    <title>Lex Libris - Diligências Realizadas</title>
                </Head>
                <Titulo style={{ marginBottom: '2rem' }}>Diligências Realizadas</Titulo>
                <ContainerInputBtnBuscaProcesso>
                    <InputBuscaProcesso
                        type="text"
                        name="buscaDiligencia"
                        id="buscaDiligencia"
                        placeholder="Nome do cliente que deseja buscar..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                    <BtnBuscaProcesso onClick={buscarDiligenciasPorCliente}>
                        <FaSearch />
                    </BtnBuscaProcesso>
                </ContainerInputBtnBuscaProcesso>

                {diligenciasExibidas.length > 0 ? (
                    <ListaProcessos style={{width: '95%'}}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Cliente</th>
                                    <th>Processo</th>
                                    <th>Descrição</th>
                                    <th>Data</th>
                                    <th>Prazo</th>
                                    <th>Advogado</th>
                                    <th>Status</th>
                                    <th>Funções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {diligenciasExibidas.map(diligencia => {
                                    const cliente = clientesMap.get(diligencia.cliente_envolv);
                                    const nomeFuncionario = funcionariosMap.get(diligencia.advogado_resp) || 'N/D';
                                    return (
                                        <tr key={diligencia.cod_diligencia}>
                                            <TdListaProcessos style={{ width: '35%' }}>{cliente ? cliente.nome : 'Nome não encontrado'}</TdListaProcessos>
                                            <DescricaoTd style={{ width: '5%' }}>{diligencia.processo_relac}</DescricaoTd>
                                            <DescricaoTd style={{ width: '40%' }}>{diligencia.descricao_dili || 'N/D'}</DescricaoTd>
                                            <DescricaoTd style={{ width: '5%' }}>{formatarData(diligencia.data_solic)}</DescricaoTd>
                                            <DescricaoTd style={{ width: '5%' }}>{diligencia.prazo_realiz || 'N/D'}</DescricaoTd>
                                            <DescricaoTd>{nomeFuncionario}</DescricaoTd>
                                            <DescricaoTd>{diligencia.status_dili}</DescricaoTd>
                                            <FuncoesListaProcessos>
                                                <BotoesListaProcesso>
                                                    <BotaoEditIcone onClick={() => handleOpenModalEditDiligencias(diligencia)}>
                                                        Editar
                                                    </BotaoEditIcone>
                                                    <BotaoEditIcone onClick={() => handleOpenModalDiligencias(diligencia)}>
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
                    <p>Nenhuma diligência encontrada.</p>
                )}

                {modalDiligenciasOpen && selectedDiligencia && (
                    <ModalDiligencias onClose={handleCloseModalDiligencias}>
                        <Subtitulo>Detalhes da Diligência</Subtitulo>
                        <ModalInternalContainer>
                            <p><FontBold>Código da Diligência:</FontBold> {selectedDiligencia.cod_diligencia}</p>
                            <p><FontBold>Cliente:</FontBold> {clientesMap.get(selectedDiligencia.cliente_envolv)?.nome || 'N/D'}</p>
                            <p><FontBold>Processo Relacionado:</FontBold> {(selectedDiligencia.processo_relac)}</p>
                            <p><FontBold>Descrição:</FontBold> {(selectedDiligencia.descricao_dili || 'N/D')}</p>
                            <p><FontBold>Data da Solicitação:</FontBold> {formatarData(selectedDiligencia.data_solic)}</p>
                            <p><FontBold>Prazo para Realização:</FontBold> {selectedDiligencia.prazo_realiz || 'N/D'}</p>
                            <p><FontBold>Advogado Responsável:</FontBold> {selectedDiligencia.advogado_resp || 'N/D'}</p>

                        </ModalInternalContainer>
                    </ModalDiligencias>
                )}

                {modalEditDiligenciasOpen && selectedDiligencia && (
                    <ModalEditDiligencias
                        onClose={handleCloseModalEditDiligencias}
                        funcionarios={funcionarios}
                        selectedFuncionario={selectedFuncionario}
                        setSelectedFuncionario={setSelectedFuncionario}
                        onSave={salvarEdicaoDiligencia}
                    />
                )}
            </Container>
        </React.Fragment>
    );
}

export default Diligencias;
