import useUserDashboard from "@/components/functions/UserDashboardFunctions";
import { Container, Titulo } from "@/theme/GlobalStyles";
import { DescricaoTxt, EditIcone, ListaProcessos, ListaProcessosLi, ListaProcessosTxt } from "@/theme/UserDashboardTheme";
import { FaExpandArrowsAlt, FaGripLinesVertical } from "react-icons/fa";

export default function ProcessosEncerrados() {
    const { clientes, processos } = useUserDashboard();
    const processosEncerrados = processos.filter(processo => processo.status_processo.toLowerCase() === 'encerrado');

    const clientesMap = new Map(clientes.map(cliente => [cliente.cpf, { nome: cliente.nome, telefone: cliente.telefone }]));

    return (
        <Container>
            <Titulo>Processos Encerrados</Titulo>
            {processosEncerrados.length > 0 ? (
                <ListaProcessos>
                    {processosEncerrados.map(processo => {
                        const cliente = clientesMap.get(processo.cliente_envolv);
                        return (
                            <>
                                <ListaProcessosLi key={processo.cod_processo}>
                                    <ListaProcessosTxt>Nome: {cliente ? cliente.nome : 'Nome não encontrado'}</ListaProcessosTxt>
                                    <ListaProcessosTxt><FaGripLinesVertical /></ListaProcessosTxt>
                                    <DescricaoTxt>{processo.descricao_processo}</DescricaoTxt>
                                    <EditIcone href="/processos/encerrados"><FaExpandArrowsAlt /></EditIcone>
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
