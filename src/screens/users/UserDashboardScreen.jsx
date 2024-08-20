import Link from "next/link";
import useUserDashboard from "../../components/functions/UserDashboardFunctions";

export default function UserDashboardScreen() {
    const { nomeAdvogado, userEmail, nomeEscritorio, clientes, processos } = useUserDashboard();
    const processosEmAndamento = processos.filter(processo => processo.status_processo === 'em andamento');
    const processosEncerrados = processos.filter(processo => processo.status_processo === 'encerrado');

    return (
        <>
            <div>
                <h1>Bem-vindo, {nomeAdvogado}!</h1>
                <p>Email: {userEmail}</p>
            </div>

            <div>
                <h2>Visão Geral</h2>
                <div>
                    {nomeEscritorio ? (
                        <p>Escritório Atual: {nomeEscritorio}</p>
                    ) : (
                        <p>Você ainda não cadastrou um escritório. Por favor, complete seu cadastro para acessar todas as funcionalidades.</p>
                    )}
                </div>
                <div>
                    <p>Seu escritório possui {clientes.length} cliente(s)</p>
                    <ul>
                        {clientes.map(cliente => (
                            <li key={cliente.cpf}>
                                {cliente.cpf} // {cliente.nome} // {cliente.telefone}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="processos-grid">
                    <div className="grid-item">
                        <h3>Processos em Andamento</h3>
                        <Link href="/processos/andamento">
                            <p>Total: {processosEmAndamento.length}</p>
                        </Link>
                    </div>
                    <div className="grid-item">
                        <h3>Processos Encerrados</h3>
                        <Link href="/processos/encerrados">
                            <p>Total: {processosEncerrados.length}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

