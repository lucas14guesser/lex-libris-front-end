import useUserDashboard from "@/components/functions/UserDashboardFunctions";
import ModalEdit from "@/components/processos/ModalEditProcesso";
import Modal from "@/components/processos/ModalProcesso";
import { Container, FontBold, Subtitulo, Titulo } from "@/theme/GlobalStyles";
import { BotaoEditIcone, BotoesListaProcesso, BtnBuscaProcesso, ButtonEdit, ContainerInputBtnBuscaProcesso, DescricaoTd, FuncoesListaProcessos, InputBuscaProcesso, ListaProcessos, ModalInternalContainer, OptionStatus, SelectStatus, TdListaProcessos } from "@/theme/UserDashboardTheme";
import { useState } from "react";
import { FaSearch, FaEdit } from "react-icons/fa";

export default function ProcessosEmAndamento() {
    const { clientes, processos, editField, modalEditOpen, modalOpen, handleClickEditarWindow, handleClickEditar, handleChangeField, handleSaveEditClick, handleCloseModalEdit, handleClickConsultar, handleCloseModal, selectedProcess, numeroProcesso, setNumeroProcesso, areaProcesso, setAreaProcesso, statusProcesso, setStatusProcesso } = useUserDashboard();
    const processosEmAndamento = processos.filter(processo => processo.status_processo.toLowerCase() === 'em andamento');
    const clientesMap = new Map(clientes.map(cliente => [cliente.cpf, { nome: cliente.nome, telefone: cliente.telefone }]));
    const [busca, setBusca] = useState('');
    const [resultadosBusca, setResultadosBusca] = useState(null); 

    const buscarProcessosPorCliente = () => {
        if (busca.trim() === '') {
            setResultadosBusca(null);
        } else {
            const resultados = processosEmAndamento.filter(processo => {
                const cliente = clientesMap.get(processo.cliente_envolv);
                return cliente && cliente.nome.toLowerCase().includes(busca.toLowerCase());
            });
            setResultadosBusca(resultados);
        }
    };

    const processosExibidos = resultadosBusca !== null ? resultadosBusca : processosEmAndamento;

    return (
        <Container>
            <Titulo>Processos em Andamento</Titulo>
            <ContainerInputBtnBuscaProcesso>
                <InputBuscaProcesso
                    type="text"
                    name="buscaProcesso"
                    id="buscaProcesso"
                    placeholder="Nome do cliente que deseja buscar..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
                <BtnBuscaProcesso onClick={buscarProcessosPorCliente}>
                    <FaSearch />
                </BtnBuscaProcesso>
            </ContainerInputBtnBuscaProcesso>

            {processosExibidos.length > 0 ? (
                <ListaProcessos>
                    <table>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Processo</th>
                                <th>Funções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processosExibidos.map(processo => {
                                const cliente = clientesMap.get(processo.cliente_envolv);
                                return (
                                    <tr key={processo.cod_processo}>
                                        <TdListaProcessos>{cliente ? cliente.nome : 'Nome não encontrado'}</TdListaProcessos>
                                        <DescricaoTd>{processo.descricao_processo}</DescricaoTd>
                                        <FuncoesListaProcessos>
                                            <BotoesListaProcesso>
                                                <BotaoEditIcone onClick={() => handleClickEditarWindow(processo)}>
                                                    Editar
                                                </BotaoEditIcone>
                                                <BotaoEditIcone onClick={() => handleClickConsultar(processo)}>
                                                    Consultar
                                                </BotaoEditIcone>
                                            </BotoesListaProcesso>
                                        </FuncoesListaProcessos>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </ListaProcessos>
            ) : (
                <p>Nenhum processo em andamento encontrado.</p>
            )}

            {modalOpen && selectedProcess && (
                <Modal onClose={handleCloseModal}>
                    <Subtitulo>Detalhes do Processo</Subtitulo>
                    <ModalInternalContainer>
                        <p><FontBold>Código do Processo:</FontBold> {selectedProcess.cod_processo}</p>
                        <p><FontBold>Número do Processo:</FontBold> {selectedProcess.numero_processo ? selectedProcess.numero_processo : 'N/D'}</p>
                        <p><FontBold>Área:</FontBold> {selectedProcess.area_processo ? selectedProcess.area_processo : 'N/D'}</p>
                        <p><FontBold>Descrição:</FontBold> {selectedProcess.descricao_processo}</p>
                        <p><FontBold>Status:</FontBold> {selectedProcess.status_processo}</p>
                        <p><FontBold>Data de Início:</FontBold> {selectedProcess.data_inicio}</p>
                    </ModalInternalContainer>
                </Modal>
            )}

            {modalEditOpen && selectedProcess && (
                <ModalEdit onClose={handleCloseModalEdit}>
                    <h2>Detalhes do Processo</h2>
                    <ModalInternalContainer>
                        <p><strong>Código do Processo: </strong> {selectedProcess.cod_processo}</p>

                        <p>
                            <strong>Número do Processo: </strong>
                            {editField === 'numero_processo' ? (
                                <input
                                    type="text"
                                    value={numeroProcesso}
                                    onChange={handleChangeField(setNumeroProcesso)}
                                    onBlur={handleSaveEditClick}
                                />
                            ) : (
                                <span>{numeroProcesso || 'N/D'}</span>
                            )}
                            <ButtonEdit onClick={() => handleClickEditar('numero_processo')}>
                                <FaEdit />
                            </ButtonEdit>
                        </p>

                        <p>
                            <strong>Área do Processo: </strong>
                            {editField === 'area_processo' ? (
                                <input
                                    type="text"
                                    value={areaProcesso}
                                    onChange={handleChangeField(setAreaProcesso)}
                                    onBlur={handleSaveEditClick}
                                />
                            ) : (
                                <span>{areaProcesso || 'N/D'}</span>
                            )}
                            <ButtonEdit onClick={() => handleClickEditar('area_processo')}>
                                <FaEdit />
                            </ButtonEdit>
                        </p>

                        <p><FontBold>Descrição: </FontBold>{selectedProcess.descricao_processo}</p>

                        <p>
                            <strong>Status do Processo: </strong>
                            {editField === 'status_processo' ? (
                                <SelectStatus
                                    value={statusProcesso}
                                    onChange={(e) => setStatusProcesso(e.target.value)}
                                    onBlur={handleSaveEditClick}
                                >
                                    <OptionStatus value="em andamento">em andamento</OptionStatus>
                                    <OptionStatus value="encerrado">encerrado</OptionStatus>
                                </SelectStatus>
                            ) : (
                                <span>{statusProcesso || 'N/D'}</span>
                            )}
                            <ButtonEdit onClick={() => handleClickEditar('status_processo')}>
                                <FaEdit />
                            </ButtonEdit>
                        </p>

                        <p><strong>Data de Início: </strong> {selectedProcess.data_inicio}</p>
                    </ModalInternalContainer>
                </ModalEdit>
            )}
        </Container>
    );
}
