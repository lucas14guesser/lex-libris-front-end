import useUserDashboard from "@/components/functions/UserDashboardFunctions";
import { Container, Titulo } from "@/theme/GlobalStyles";
import { BotaoEditIcone, BotoesListaProcesso, BtnBuscaProcesso, ContainerInputBtnBuscaProcesso, DescricaoTxt, InputBuscaProcesso, ListaProcessos, ListaProcessosLi, ListaProcessosTxt } from "@/theme/UserDashboardTheme";
import { FaSearch, FaEdit, FaExpandArrowsAlt } from "react-icons/fa";

export default function ProcessosEmAndamento() {
    const { clientes, processos } = useUserDashboard();
    const processosEmAndamento = processos.filter(processo => processo.status_processo.toLowerCase() === 'em andamento');

    const clientesMap = new Map(clientes.map(cliente => [cliente.cpf, { nome: cliente.nome, telefone: cliente.telefone }]));

    return (
        <Container>
            <Titulo>Processos em Andamento</Titulo>
            <ContainerInputBtnBuscaProcesso>
                <InputBuscaProcesso type="text" name="buscaProcesso" id="buscaProcesso" placeholder="Cliente ou processo que deseja buscar..."/>
                <BtnBuscaProcesso>
                    <FaSearch />
                </BtnBuscaProcesso>
            </ContainerInputBtnBuscaProcesso>
            {processosEmAndamento.length > 0 ? (
                <ListaProcessos>
                    {processosEmAndamento.map(processo => {
                        const cliente = clientesMap.get(processo.cliente_envolv);
                        return (
                            <>
                                <ListaProcessosLi key={processo.cod_processo}>
                                    <ListaProcessosTxt>Cliente: {cliente ? cliente.nome : 'Nome não encontrado'}</ListaProcessosTxt>
                                    <DescricaoTxt>Processo: {processo.descricao_processo}</DescricaoTxt>
                                    <BotoesListaProcesso>
                                        <BotaoEditIcone>
                                            Editar
                                            <FaEdit />
                                        </BotaoEditIcone>
                                        <BotaoEditIcone>
                                            Expandir
                                            <FaExpandArrowsAlt />
                                        </BotaoEditIcone>
                                    </BotoesListaProcesso>
                                </ListaProcessosLi>
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
