import useUserDashboard from "@/components/functions/UserDashboardFunctions";
import { Container, Titulo } from "@/theme/GlobalStyles";
import { DescricaoTxt, EditIcone, ListaProcessos, ListaProcessosLi, ListaProcessosTxt } from "@/theme/UserDashboardTheme";
import { FaEdit, FaGripLinesVertical } from "react-icons/fa";

export default function ProcessosEmAndamento() {
    const { clientes, processos } = useUserDashboard();
    const processosEmAndamento = processos.filter(processo => processo.status_processo.toLowerCase() === 'em andamento');

    const clientesMap = new Map(clientes.map(cliente => [cliente.cpf, { nome: cliente.nome, telefone: cliente.telefone }]));

    return (
        <Container>
            <Titulo>Processos em Andamento</Titulo>
            {processosEmAndamento.length > 0 ? (
                <ListaProcessos>
                    {processosEmAndamento.map(processo => {
                        const cliente = clientesMap.get(processo.cliente_envolv);
                        return (
                            <>
                                <ListaProcessosLi key={processo.cod_processo}>
                                        <ListaProcessosTxt>Nome: {cliente ? cliente.nome : 'Nome não encontrado'}</ListaProcessosTxt>
                                        <ListaProcessosTxt><FaGripLinesVertical /></ListaProcessosTxt>
                                        <DescricaoTxt>{processo.descricao_processo}</DescricaoTxt>
                                        <EditIcone href="/processos/andamento"><FaEdit /></EditIcone>
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
