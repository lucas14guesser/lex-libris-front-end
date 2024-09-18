import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from '../../context/UserContext';
import userDashboardFunctions from "../../components/functions/UserDashboardFunctions";
import { BotaoLogout, ContainerProcessosAndEnc, ContainerUserDashboard, LinkProcessosAndEnc, ListaClientes, TituloUser, TxtUsuarioDashboard } from "@/theme/UserDashboardTheme";
import { Container, Titulo } from "@/theme/GlobalStyles";
import ProtectedRoute from "@/components/ProtecaoRotas";

export default function UserDashboardScreen() {
    const { nomeAdvogado, nomeEscritorio, clientes, processos, loading, error } = userDashboardFunctions();
    const { logout, isAuthenticated } = useUser();
    const router = useRouter();
    const [hasRedirected, setHasRedirected] = useState(false);
    const processosEmAndamento = processos.filter(processo => processo.status_processo === 'em andamento');
    const processosEncerrados = processos.filter(processo => processo.status_processo === 'encerrado');

    useEffect(() => {
        if (loading) {
            return;
        }
        if (isAuthenticated && !hasRedirected) {
            router.replace('/userDashboard');
            setHasRedirected(true);
        }
    }, [isAuthenticated, loading, router, hasRedirected]);

    if (loading) {
        return <div>Redirecionando...</div>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <ProtectedRoute publicRoutes={['/', '/login', '/cadastro']}>
            <TituloUser>
                Bem-vindo, {nomeAdvogado}!
            </TituloUser>
            <BotaoLogout onClick={logout}>
                Sair
            </BotaoLogout>
            <Container>
                <ContainerUserDashboard>
                    <Titulo>
                        Visão Geral {nomeEscritorio ? `- ${nomeEscritorio}` : ''}
                    </Titulo>
                    {!nomeEscritorio && (
                        <TxtUsuarioDashboard>
                            Você ainda não cadastrou um escritório. Por favor, complete seu cadastro para acessar todas as funcionalidades.
                        </TxtUsuarioDashboard>
                    )}
                    <ContainerProcessosAndEnc>
                        <LinkProcessosAndEnc href="/processos/andamento">
                            <TxtUsuarioDashboard>
                                Processos em Andamento
                            </TxtUsuarioDashboard>
                            <TxtUsuarioDashboard>
                                {processosEmAndamento.length}
                            </TxtUsuarioDashboard>
                        </LinkProcessosAndEnc>
                        <LinkProcessosAndEnc href="/processos/encerrados">
                            <TxtUsuarioDashboard>
                                Processos Encerrados
                            </TxtUsuarioDashboard>
                            <TxtUsuarioDashboard>
                                {processosEncerrados.length}
                            </TxtUsuarioDashboard>
                        </LinkProcessosAndEnc>
                    </ContainerProcessosAndEnc>
                    <TxtUsuarioDashboard>
                        Lista de Clientes
                    </TxtUsuarioDashboard>
                    <ListaClientes>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Telefone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map(cliente => (
                                    <tr key={cliente.cpf}>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.telefone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </ListaClientes>
                </ContainerUserDashboard>
            </Container>
        </ProtectedRoute>
    );

}
