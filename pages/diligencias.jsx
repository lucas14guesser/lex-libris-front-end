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
    ButtonEdit,
    SelectStatus,
    OptionStatus,
} from '@/theme/UserDashboardTheme';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaEdit, FaSearch } from 'react-icons/fa';
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
    const [editFieldDili, setEditFieldDili] = useState('');

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



    const handleFieldChange = (field, value) => {
        setSelectedDiligencia(prevState => ({
            ...prevState,
            [field]: value
        }));
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
        if (!selectedDiligencia) {
            alert('Selecione uma diligência antes de salvar!');
            return;
        }
    
        let funcionario;
    
        if (selectedFuncionario) {
            funcionario = funcionarios.find(func => func.nome_funcionario === selectedFuncionario);
            if (!funcionario) {
                alert('Funcionário selecionado não foi encontrado!');
                return;
            }
    
            const idFuncionario = funcionario.id_funcionario;
            console.log("Salvando advogado na diligência:", selectedDiligencia.cod_diligencia, idFuncionario);
            await axios.put(`http://localhost:3001/lex/diligencia/front/${selectedDiligencia.cod_diligencia}/${idFuncionario}`);
        }
    
        const { descricao_dili, prazo_realiz, status_dili } = selectedDiligencia;
    
        console.log("Atualizando campos da diligência:", descricao_dili, prazo_realiz, status_dili);
        
        if (descricao_dili || prazo_realiz || status_dili) {
            await axios.put(`http://localhost:3001/lex/diligencia/${selectedDiligencia.cod_diligencia}`, {
                descricao_dili,
                prazo_realiz,
                status_dili
            });
        }
    
        const diligenciasAtualizadas = diligencias.map(diligencia => {
            if (diligencia.cod_diligencia === selectedDiligencia.cod_diligencia) {
                return { 
                    ...diligencia, 
                    nome_funcionario: selectedFuncionario ? funcionario.nome_funcionario : diligencia.nome_funcionario,
                    id_funcionario: selectedFuncionario ? funcionario.id_funcionario : diligencia.id_funcionario,
                    descricao_dili,
                    prazo_realiz,
                    status_dili
                };
            }
            return diligencia;
        });
    
        setResultadosBusca(diligenciasAtualizadas);
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
                    <ListaProcessos style={{ width: '95%' }}>
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
                                    const nomeFuncionario = funcionariosMap.get(diligencia.id_funcionario) || 'N/D';
                                    return (
                                        <tr key={diligencia.cod_diligencia}>
                                            <TdListaProcessos style={{ width: '35%' }}>{cliente ? cliente.nome : 'Nome não encontrado'}</TdListaProcessos>
                                            <DescricaoTd style={{ width: '5%' }}>{diligencia.processo_relac}</DescricaoTd>
                                            <DescricaoTd style={{ width: '40%' }}>{diligencia.descricao_dili || 'N/D'}</DescricaoTd>
                                            <DescricaoTd style={{ width: '5%' }}>{formatarData(diligencia.data_solic)}</DescricaoTd>
                                            <DescricaoTd style={{ width: '5%' }}>{formatarData(diligencia.prazo_realiz) || 'N/D'}</DescricaoTd>
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
                            <p><FontBold>Prazo para Realização:</FontBold> {formatarData(selectedDiligencia.prazo_realiz) || 'N/D'}</p>
                            <p><FontBold>Advogado Responsável:</FontBold> {funcionariosMap.get(selectedDiligencia.id_funcionario) || 'N/D'}</p>
                            <p><FontBold>Status:</FontBold> {(selectedDiligencia.status_dili || 'N/D')}</p>

                        </ModalInternalContainer>
                    </ModalDiligencias>
                )}

                {modalEditDiligenciasOpen && selectedDiligencia && (
                    <ModalEditDiligencias>
                        <Subtitulo>Editar Diligência</Subtitulo>
                        <ModalInternalContainer>
                            <p><FontBold>Código da Diligência:</FontBold> {selectedDiligencia.cod_diligencia}</p>
                            <p><FontBold>Cliente:</FontBold> {clientesMap.get(selectedDiligencia.cliente_envolv)?.nome || 'N/D'}</p>
                            <p><FontBold>Processo Relacionado:</FontBold> {selectedDiligencia.processo_relac}</p>

                            <p>
                                <FontBold>Descrição:</FontBold>
                                {editFieldDili === 'descricao_dili' ? (
                                    <input
                                        type="text"
                                        value={selectedDiligencia.descricao_dili}
                                        onChange={(e) => handleFieldChange('descricao_dili', e.target.value)}
                                    />
                                ) : (
                                    <span>{selectedDiligencia.descricao_dili || 'N/D'}</span>
                                )}
                                <ButtonEdit onClick={() => setEditFieldDili('descricao_dili')}>
                                    <FaEdit />
                                </ButtonEdit>
                            </p>

                            <p>
                                <FontBold>Prazo para Realização:</FontBold>
                                {editFieldDili === 'prazo_realiz' ? (
                                    <input
                                        type="date"
                                        value={selectedDiligencia.prazo_realiz}
                                        onChange={(e) => handleFieldChange( 'prazo_realiz', e.target.value )}
                                    />
                                ) : (
                                    <span>{formatarData(selectedDiligencia.prazo_realiz) || 'N/D'}</span>
                                )}
                                <ButtonEdit onClick={() => setEditFieldDili('prazo_realiz')}>
                                    <FaEdit />
                                </ButtonEdit>
                            </p>
                            <p><FontBold>Advogado Responsável:</FontBold> {funcionariosMap.get(selectedDiligencia.id_funcionario) || 'N/D'}</p>
                            <label htmlFor="funcionarioSelect">Selecione um advogado:</label>
                            <StyledSelect
                                id="funcionarioSelect"
                                value={selectedFuncionario}
                                onChange={(e) => setSelectedFuncionario(e.target.value)}
                            >
                                <StyledOption value="" disabled>Selecione um advogado</StyledOption>
                                {funcionarios.map(func => (
                                    <option key={func.id_funcionario} value={func.nome_funcionario}>
                                        {func.nome_funcionario}
                                    </option>
                                ))}
                            </StyledSelect>
                            <p>
                                <FontBold>Status:</FontBold>
                                {editFieldDili === 'status_dili' ? (
                                    <SelectStatus
                                        value={selectedDiligencia.status_dili}
                                        onChange={(e) => handleFieldChange( 'status_dili', e.target.value )}
                                    >
                                        <OptionStatus value="pendente">pendente</OptionStatus>
                                        <OptionStatus value="em andamento">em andamento</OptionStatus>
                                        <OptionStatus value="concluído">concluído</OptionStatus>
                                    </SelectStatus>
                                ) : (
                                    <span>{selectedDiligencia.status_dili || 'N/D'}</span>
                                )}
                                <ButtonEdit onClick={() => setEditFieldDili('status_dili')}>
                                    <FaEdit />
                                </ButtonEdit>
                            </p>

                            <DivFlexButtonSubmit>
                                <BotaoSubmit onClick={salvarEdicaoDiligencia}>Salvar</BotaoSubmit>
                                <BotaoSubmit onClick={handleCloseModalEditDiligencias}>Fechar</BotaoSubmit>
                            </DivFlexButtonSubmit>
                        </ModalInternalContainer>
                    </ModalEditDiligencias>
                )}
            </Container>
        </React.Fragment>
    );
}

export default Diligencias;
