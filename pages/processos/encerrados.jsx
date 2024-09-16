import useUserDashboard from "@/components/functions/UserDashboardFunctions";
import { Container, Titulo } from "@/theme/GlobalStyles";
import { BotaoEditIcone, BotoesListaProcesso, BtnBuscaProcesso, ContainerInputBtnBuscaProcesso, DescricaoTxt, InputBuscaProcesso, ListaProcessos, ListaProcessosLi, ListaProcessosTxt } from "@/theme/UserDashboardTheme";
import { FaSearch, FaExpandArrowsAlt } from "react-icons/fa";

export default function ProcessosEncerrados() {
    const { clientes, processos } = useUserDashboard();
    const processosEncerrados = processos.filter(processo => processo.status_processo.toLowerCase() === 'encerrado');

    const clientesMap = new Map(clientes.map(cliente => [cliente.cpf, { nome: cliente.nome, telefone: cliente.telefone }]));

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
                    {processosEncerrados.map(processo => {
                        const cliente = clientesMap.get(processo.cliente_envolv);
                        return (
                            <>
                                <ListaProcessosLi key={processo.cod_processo}>
                                    <ListaProcessosTxt>Cliente: {cliente ? cliente.nome : 'Nome não encontrado'}</ListaProcessosTxt>
                                    <DescricaoTxt>Processo: {processo.descricao_processo}</DescricaoTxt>
                                    <BotoesListaProcesso>
                                        <BotaoEditIcone>
                                            Expandir
                                            <FaExpandArrowsAlt />
                                        </BotaoEditIcone>
                                    </BotoesListaProcesso>
                                </ListaProcessosLi>
                                {/*
                                <li key={processo.cod_processo}>
                                    <p><strong>Processo relacionado:</strong></p>
                                    <p>Código do Processo: {processo.cod_processo}</p>
                                    <p>Número do Processo: {processo.numero_processo}</p>
                                    <p>Área: {processo.area_processo}</p>
                                    <p>Descrição: {processo.descricao_processo}</p>
                                    <p>Status: {processo.status_processo}</p>
                                    <p>Data de Início: {processo.data_inicio}</p>
                                </li>
                                */}
                            </>
                        )
                    })}
                </ListaProcessos>
            ) : (
                <p>Nenhum processo em andamento encontrado.</p>
            )}
        </Container>
    );
}
