import useUserDashboard from "@/components/functions/UserDashboardFunctions";
import Modal from "@/components/processos/ModelProcesso";
import { Container, FontBold, Subtitulo, Titulo } from "@/theme/GlobalStyles";
import { BotaoEditIcone, BotoesListaProcesso, BtnBuscaProcesso, ContainerInputBtnBuscaProcesso, DescricaoTd, FuncoesListaProcessos, InputBuscaProcesso, ListaProcessos, TdListaProcessos } from "@/theme/UserDashboardTheme";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function ProcessosEncerrados() {
    const { clientes, processos } = useUserDashboard();
    const processosEncerrados = processos.filter(processo => processo.status_processo.toLowerCase() === 'encerrado');

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProcess, setSelectedProccess] = useState(null);

    const clientesMap = new Map(clientes.map(cliente => [cliente.cpf, { nome: cliente.nome, telefone: cliente.telefone }]));

    const handleClickConsultar = (processo) => {
        setSelectedProccess(processo);
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProccess(null);
    }

    return (
        <Container>
            <Titulo>Processos Encerrados</Titulo>
            <ContainerInputBtnBuscaProcesso>
                <InputBuscaProcesso type="text" name="buscaProcesso" id="buscaProcesso" placeholder="Cliente ou processo que deseja buscar..." />
                <BtnBuscaProcesso>
                    <FaSearch />
                </BtnBuscaProcesso>
            </ContainerInputBtnBuscaProcesso>
            {processosEncerrados.length > 0 ? (
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
                            {processosEncerrados.map(processo => {
                                const cliente = clientesMap.get(processo.cliente_envolv);
                                return (
                                    <tr key={processo.cod_processo}>
                                        <TdListaProcessos>{cliente ? cliente.nome : 'Nome não encontrado'}</TdListaProcessos>
                                        <DescricaoTd>{processo.descricao_processo}</DescricaoTd>
                                        <FuncoesListaProcessos>
                                            <BotoesListaProcesso>
                                                <BotaoEditIcone onClick={() => handleClickConsultar(processo)}>
                                                    Consultar
                                                </BotaoEditIcone>
                                            </BotoesListaProcesso>
                                        </FuncoesListaProcessos>
                                        {/*
                                <li key={processo.cod_processo}>
                                    <p><FontBold>Processo relacionado:</FontBold></p>
                                    <p>Código do Processo: {processo.cod_processo}</p>
                                    <p>Número do Processo: {processo.numero_processo}</p>
                                    <p>Área: {processo.area_processo}</p>
                                    <p>Descrição: {processo.descricao_processo}</p>
                                    <p>Status: {processo.status_processo}</p>
                                    <p>Data de Início: {processo.data_inicio}</p>
                                </li>
                                */}
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>
                </ListaProcessos>
            ) : (
                <p>Nenhum processo encerrado encontrado.</p>
            )}

            {modalOpen && selectedProcess && (
                <Modal onClose={handleCloseModal}>
                    <Subtitulo>Detalhes do Processo</Subtitulo>
                    <p><FontBold>Código do Processo:</FontBold> {selectedProcess.cod_processo}</p>
                    <p><FontBold>Número do Processo:</FontBold> {selectedProcess.numero_processo}</p>
                    <p><FontBold>Área:</FontBold> {selectedProcess.area_processo}</p>
                    <p><FontBold>Descrição:</FontBold> {selectedProcess.descricao_processo}</p>
                    <p><FontBold>Status:</FontBold> {selectedProcess.status_processo}</p>
                    <p><FontBold>Data de Início:</FontBold> {selectedProcess.data_inicio}</p>
                </Modal>
            )}
        </Container>
    );
}
