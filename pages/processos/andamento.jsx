import useUserDashboard from "@/components/functions/UserDashboardFunctions";
import Modal from "@/components/processos/ModelProcesso";
import { Container, FontBold, Subtitulo, Titulo } from "@/theme/GlobalStyles";
import { BotaoEditIcone, BotoesListaProcesso, BtnBuscaProcesso, ContainerInputBtnBuscaProcesso, DescricaoTd, FuncoesListaProcessos, InputBuscaProcesso, ListaProcessos, TdListaProcessos } from "@/theme/UserDashboardTheme";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function ProcessosEmAndamento() {
    const { clientes, processos } = useUserDashboard();
    const processosEmAndamento = processos.filter(processo => processo.status_processo.toLowerCase() === 'em andamento');

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProcess, setSelectedProccess] = useState(null);

    const handleClickConsultar = (processo) => {
        setSelectedProccess(processo);
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProccess(null);
    }

    const clientesMap = new Map(clientes.map(cliente => [cliente.cpf, { nome: cliente.nome, telefone: cliente.telefone }]));

    return (
        <Container>
            <Titulo>Processos em Andamento</Titulo>
            <ContainerInputBtnBuscaProcesso>
                <InputBuscaProcesso type="text" name="buscaProcesso" id="buscaProcesso" placeholder="Cliente ou processo que deseja buscar..." />
                <BtnBuscaProcesso>
                    <FaSearch />
                </BtnBuscaProcesso>
            </ContainerInputBtnBuscaProcesso>
            {processosEmAndamento.length > 0 ? (
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
                            {processosEmAndamento.map(processo => {
                                const cliente = clientesMap.get(processo.cliente_envolv);
                                return (
                                    <tr key={processo.cod_processo}>
                                        <TdListaProcessos>{cliente ? cliente.nome : 'Nome não encontrado'}</TdListaProcessos>
                                        <DescricaoTd>{processo.descricao_processo}</DescricaoTd>
                                        <FuncoesListaProcessos>
                                            <BotoesListaProcesso>
                                                <BotaoEditIcone>
                                                    Editar
                                                </BotaoEditIcone>
                                                <BotaoEditIcone onClick={() => handleClickConsultar(processo)}>
                                                    Consultar
                                                </BotaoEditIcone>
                                            </BotoesListaProcesso>
                                        </FuncoesListaProcessos>

                                        {/* 
                                <ListaClientesLi>
                                    <TxtUsuarioDashboard><strong>Processo relacionado:</strong></TxtUsuarioDashboard>
                                    <TxtUsuarioDashboard>Código do Processo: {processo.cod_processo}</TxtUsuarioDashboard>
                                    <TxtUsuarioDashboard>Número do Processo: {processo.numero_processo}</TxtUsuarioDashboard>
                                    <TxtUsuarioDashboard>Área: {processo.area_processo}</TxtUsuarioDashboard>
                                    <TxtUsuarioDashboard>Status: {processo.status_processo}</TxtUsuarioDashboard>
                                    <TxtUsuarioDashboard>Data de Início: {processo.data_inicio}</TxtUsuarioDashboard>
                                </ListaClientesLi>
                                */}
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
                    <p><FontBold>Código do Processo:</FontBold> {selectedProcess.cod_processo}</p>
                    <p><FontBold>Número do Processo:</FontBold> {selectedProcess.numero_processo ? selectedProcess.numero_processo : 'N/D'}</p>
                    <p><FontBold>Área:</FontBold> {selectedProcess.area_processo ? selectedProcess.area_processo : 'N/D'}</p>
                    <p><FontBold>Descrição:</FontBold> {selectedProcess.descricao_processo}</p>
                    <p><FontBold>Status:</FontBold> {selectedProcess.status_processo}</p>
                    <p><FontBold>Data de Início:</FontBold> {selectedProcess.data_inicio}</p>
                </Modal>
            )}
        </Container>
    );
}
