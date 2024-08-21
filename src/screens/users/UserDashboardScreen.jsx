import useUserDashboard from "../../components/functions/UserDashboardFunctions";
import { Container, Titulo } from "@/theme/GlobalStyles";
import { ContainerProcessosAndEnc, ContainerUserDashboard, LinkProcessosAndEnc, ListaClientes, ListaClientesLi, ListaClientesTxt, TituloUser, TxtUsuarioDashboard, } from "@/theme/UserDashboardTheme";
import React from "react";

export default function UserDashboardScreen() {
    const { nomeAdvogado, nomeEscritorio, clientes, processos } = useUserDashboard();
    const processosEmAndamento = processos.filter(processo => processo.status_processo === 'em andamento');
    const processosEncerrados = processos.filter(processo => processo.status_processo === 'encerrado');

    return (
        <React.Fragment>
            <TituloUser>Bem-vindo, {nomeAdvogado}!</TituloUser>
            <Container>
                <ContainerUserDashboard>
                    {nomeEscritorio ? (
                        <Titulo>Visão Geral - {nomeEscritorio}</Titulo>
                    ) : (
                        <Titulo>Visão Geral</Titulo>
                    )}
                    {nomeEscritorio ? (
                        <></>
                    ) : (
                        <TxtUsuarioDashboard>Você ainda não cadastrou um escritório. Por favor, complete seu cadastro para acessar todas as funcionalidades.</TxtUsuarioDashboard>
                    )}
                    <ContainerProcessosAndEnc>
                        <LinkProcessosAndEnc href="/processos/andamento">
                            <TxtUsuarioDashboard>Processos em Andamento</TxtUsuarioDashboard>
                            <TxtUsuarioDashboard>{processosEmAndamento.length}</TxtUsuarioDashboard>
                        </LinkProcessosAndEnc>
                        <LinkProcessosAndEnc href="/processos/encerrados">
                            <TxtUsuarioDashboard>Processos Encerrados</TxtUsuarioDashboard>
                            <TxtUsuarioDashboard>{processosEncerrados.length}</TxtUsuarioDashboard>
                        </LinkProcessosAndEnc>
                    </ContainerProcessosAndEnc>
                    <TxtUsuarioDashboard>Lista de Clientes</TxtUsuarioDashboard>
                    <ListaClientes>
                        {clientes.map(cliente => (
                            <ListaClientesLi key={cliente.cpf}>
                                <ListaClientesTxt>Nome: {cliente.nome} - Telefone: {cliente.telefone}</ListaClientesTxt>
                            </ListaClientesLi>
                        ))}
                    </ListaClientes>
                </ContainerUserDashboard>
            </Container>
        </React.Fragment>
    );
}

