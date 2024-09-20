import useUserDashboard from "@/components/functions/UserDashboardFunctions";
import Modal from "@/components/processos/ModalProcesso";
import { Container, FontBold, Subtitulo, Titulo } from "@/theme/GlobalStyles";
import { BotaoEditIcone, BotoesListaProcesso, BtnBuscaProcesso, ContainerInputBtnBuscaProcesso, DescricaoTd, FuncoesListaProcessos, InputBuscaProcesso, ListaProcessos, ModalInternalContainer, TdListaProcessos } from "@/theme/UserDashboardTheme";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function ProcessosEncerrados() {
    const { clientes, processos, modalOpen, handleClickConsultar, handleCloseModal, selectedProcess, handleClickReabrir } = useUserDashboard();
    const processosEncerrados = processos.filter(processo => processo.status_processo.toLowerCase() === 'encerrado');
    const clientesMap = new Map(clientes.map(cliente => [cliente.cpf, { nome: cliente.nome, telefone: cliente.telefone }]));

    const [busca, setBusca] = useState('');
    const [resultadosBusca, setResultadosBusca] = useState(null);

    const buscarProcessosPorCliente = () => {
        if (busca.trim() === '') {
            setResultadosBusca(null);
        } else {
            const resultados = processosEncerrados.filter(processo => {
                const cliente = clientesMap.get(processo.cliente_envolv);
                return cliente && cliente.nome.toLowerCase().includes(busca.toLowerCase());
            });
            setResultadosBusca(resultados);
        }
    };

    const processosExibidos = resultadosBusca !== null ? resultadosBusca : processosEncerrados;

    return (
        <Container>
            <Titulo>Processos Encerrados</Titulo>
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
                                                <BotaoEditIcone onClick={() => handleClickReabrir(processo)}>
                                                    Reabrir
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
                <p>Nenhum processo encerrado encontrado.</p>
            )}

            {modalOpen && selectedProcess && (
                <Modal onClose={handleCloseModal}>
                    <Subtitulo>Detalhes do Processo</Subtitulo>
                    <ModalInternalContainer>
                        <p><FontBold>Código do Processo:</FontBold> {selectedProcess.cod_processo}</p>
                        <p><FontBold>Número do Processo:</FontBold> {selectedProcess.numero_processo}</p>
                        <p><FontBold>Área:</FontBold> {selectedProcess.area_processo}</p>
                        <p><FontBold>Descrição:</FontBold> {selectedProcess.descricao_processo}</p>
                        <p><FontBold>Status:</FontBold> {selectedProcess.status_processo}</p>
                        <p><FontBold>Data de Início:</FontBold> {selectedProcess.data_inicio}</p>
                    </ModalInternalContainer>
                </Modal>
            )}
        </Container>
    );
}
