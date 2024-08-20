import useUserDashboard from "@/components/functions/UserDashboardFunctions";

export default function ProcessosEncerrados() {
    const { clientes, processos } = useUserDashboard();
    const processosEncerrados = processos.filter(processo => processo.status_processo.toLowerCase() === 'encerrado');

    const clientesMap = new Map(clientes.map(cliente => [cliente.cpf, { nome: cliente.nome, telefone: cliente.telefone }]));

    return (
        <div>
            <h2>Processos Encerrados</h2>
            {processosEncerrados.length > 0 ? (
                <ul>
                    {processosEncerrados.map(processo => {
                        const cliente = clientesMap.get(processo.cliente_envolv);
                        return (
                            <>
                                <li>
                                    <p><strong>Cliente envolvido no processo:</strong></p>
                                    <p>Nome: {cliente ? cliente.nome : 'Nome não encontrado'}</p>
                                    <p>CPF: {processo.cliente_envolv}</p>
                                    <p>Telefone: {cliente ? cliente.telefone : 'Telefone não encontrado'}</p>
                                </li>
                                <li key={processo.cod_processo}>
                                    <p><strong>Processo relacionado:</strong></p>
                                    <p>Código do Processo: {processo.cod_processo}</p>
                                    <p>Número do Processo: {processo.numero_processo}</p>
                                    <p>Área: {processo.area_processo}</p>
                                    <p>Descrição: {processo.descricao_processo}</p>
                                    <p>Status: {processo.status_processo}</p>
                                    <p>Data de Início: {processo.data_inicio}</p>
                                </li>
                            </>
                        )
                    })}
                </ul>
            ) : (
                <p>Nenhum processo em andamento encontrado.</p>
            )}
        </div>
    );
}
