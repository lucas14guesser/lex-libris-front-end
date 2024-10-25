import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from '../../context/UserContext';
import useUserDashboard from "../../components/functions/UserDashboardFunctions";
import CadastroFunction from '@/components/functions/CadastroFunctions';
import { BotaoLogout, BtnBuscaProcesso, ContainerButtonsFunctions, ContainerInputBtnBuscaProcesso, ContainerProcessosAndEnc, ContainerTxtCadastroEscritorio, ContainerUserDashboard, InputBuscaProcesso, LinkConfigEscritorio, LinkProcessosAndEnc, ListaClientes, ModalInternalContainer, TituloUser, TxtUsuarioDashboard } from "@/theme/UserDashboardTheme";
import ProtectedRoute from "@/components/ProtecaoRotas";
import { FaSearch, FaRegHandPaper } from "react-icons/fa";
import { AiOutlineCloseCircle, AiOutlineClockCircle, AiOutlineProfile } from "react-icons/ai";
import ModalCadEscri from "@/components/functions/ModalCadEscri";
import { RiPhoneLine, RiUser3Line, RiMenuFill } from "react-icons/ri";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { BotaoSubmit, CamposInput, Container, ContainerLabelInput, Formulario, StyledError, TextoLabel, Titulo, Subtitulo, StyledSuccess } from '@/theme/GlobalStyles'
import ModalUserProfile from "@/components/functions/ModalUserProfile";
import Head from "next/head";

export default function UserDashboardScreen() {
    const { nomeAdvogado, nomeEscritorio, telefoneEscritorio, clientes, processos, agendamentos, diligencias, loading, handleClickModalCadEscri, modalCadEscriOpen, handleCloseModalCadEscri, modalUserProfileOpen, handleClickModalUserProfile, handleCloseModalUserProfile} = useUserDashboard();
    const { telefoneEscritorioCreate, setTelefoneEscritorioCreate, nomeEscritorioCreate, setNomeEscritorioCreate, advogadoResp, setAdvogadoResp, handleCadastroEscritorio, error, success } = CadastroFunction();
    const { userEmail } = useUser()
    const { logout, isAuthenticated } = useUser();
    const router = useRouter();
    const [hasRedirected, setHasRedirected] = useState(false);
    const [busca, setBusca] = useState('');
    const [clientesFiltrados, setClientesFiltrados] = useState(clientes);

    const [submenuAbrir, setSubmenuAbrir] = useState(false);

    const buscarClientes = () => {
        if (busca.trim() === '') {
            setClientesFiltrados(clientes);
        } else {
            const resultados = clientes.filter(cliente =>
                cliente.nome.toLowerCase().includes(busca.toLowerCase())
            );
            setClientesFiltrados(resultados);
        }
    };

    const toggleSubmenu = () => {
        setSubmenuAbrir(!submenuAbrir);
    }

    useEffect(() => {
        if (loading) {
            return;
        }
        if (isAuthenticated && !hasRedirected) {
            router.replace('/userDashboard');
            setHasRedirected(true);
        }
        if (userEmail) {
            setAdvogadoResp(userEmail)
        }

    }, [isAuthenticated, loading, router, hasRedirected]);

    useEffect(() => {
        setClientesFiltrados(clientes);
    }, [clientes]);

    if (loading) {
        return <div>Redirecionando...</div>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <ProtectedRoute publicRoutes={['/', '/login', '/cadastro']}>
            <Head>
                <title>Lex Libris - Painel do usuário</title>
            </Head>
            <TituloUser onClick={toggleSubmenu} style={{marginTop: '7rem'}}>
                <RiMenuFill /> Boas-vindas, {nomeAdvogado}!
            </TituloUser>
            {submenuAbrir && (
                <ContainerButtonsFunctions>
                    <BotaoLogout onClick={handleClickModalUserProfile}>
                        Meu perfil
                    </BotaoLogout>
                    <LinkConfigEscritorio href='/configurarEscritorio'>
                        Configurar escritório
                    </LinkConfigEscritorio>
                    <BotaoLogout onClick={logout}>
                        Sair
                    </BotaoLogout>
                </ContainerButtonsFunctions>
            )}
            <Container>
                <ContainerUserDashboard>
                    <Titulo style={{marginTop: '3rem'}}>
                        Visão Geral {nomeEscritorio ? `- ${nomeEscritorio}` : ''}
                    </Titulo>
                    {!nomeEscritorio && (
                        <ContainerTxtCadastroEscritorio>
                            <TxtUsuarioDashboard>
                                Você ainda não cadastrou um escritório. Por favor, cadastre seu escritório clicando no botão à baixo.
                            </TxtUsuarioDashboard>
                            <BotaoLogout onClick={handleClickModalCadEscri} style={{ marginBottom: '3rem' }}>
                                Cadastrar Escritório
                            </BotaoLogout>
                        </ContainerTxtCadastroEscritorio>
                    )}
                    <ContainerProcessosAndEnc>
                        <LinkProcessosAndEnc href="/processos/andamento">
                            <TxtUsuarioDashboard>
                                Processos em Andamento <br />
                                <AiOutlineClockCircle style={{marginTop: '.5rem', fontSize: '1.5rem'}}/>
                            </TxtUsuarioDashboard>
                            <TxtUsuarioDashboard style={{marginTop: '1rem'}}>
                                {processos.filter(processo => processo.status_processo === 'em andamento').length}
                            </TxtUsuarioDashboard>
                        </LinkProcessosAndEnc>
                        <LinkProcessosAndEnc href="/processos/encerrados">
                            <TxtUsuarioDashboard>
                                Processos Encerrados <br />
                                <AiOutlineCloseCircle style={{marginTop: '.5rem', fontSize: '1.5rem'}}/>
                            </TxtUsuarioDashboard>
                            <TxtUsuarioDashboard style={{marginTop: '1rem'}}>
                                {processos.filter(processo => processo.status_processo === 'encerrado').length}
                            </TxtUsuarioDashboard>
                        </LinkProcessosAndEnc>
                        <LinkProcessosAndEnc href="/agendamentos">
                            <TxtUsuarioDashboard>
                                Agendamentos Realizados <br />
                                <AiOutlineProfile style={{marginTop: '.5rem', fontSize: '1.5rem'}}/>
                            </TxtUsuarioDashboard>
                            <TxtUsuarioDashboard style={{marginTop: '1rem'}}>
                                {agendamentos.length}
                            </TxtUsuarioDashboard>
                        </LinkProcessosAndEnc>
                        <LinkProcessosAndEnc href="/diligencias">
                            <TxtUsuarioDashboard>
                                Diligências Solicitadas <br />
                                <FaRegHandPaper style={{marginTop: '.5rem', fontSize: '1.5rem'}}/>
                            </TxtUsuarioDashboard>
                            <TxtUsuarioDashboard style={{marginTop: '1rem'}}>
                                {diligencias.length}
                            </TxtUsuarioDashboard>
                        </LinkProcessosAndEnc>
                    </ContainerProcessosAndEnc>
                    <TxtUsuarioDashboard>
                        Lista de Clientes
                    </TxtUsuarioDashboard>
                    <ContainerInputBtnBuscaProcesso  style={{marginTop: '1rem'}}>
                        <InputBuscaProcesso
                            type="text"
                            name="buscaCliente"
                            id="buscaCliente"
                            placeholder="Nome do cliente que deseja buscar..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                        <BtnBuscaProcesso onClick={buscarClientes}>
                            <FaSearch />
                        </BtnBuscaProcesso>
                    </ContainerInputBtnBuscaProcesso>
                    <ListaClientes>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Telefone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientesFiltrados.map(cliente => (
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

            {modalCadEscriOpen && (
                <ModalCadEscri>
                    <Formulario onSubmit={handleCadastroEscritorio}>
                        <Subtitulo>Cadastrar Escritório</Subtitulo>
                        <ContainerLabelInput>
                            <TextoLabel htmlFor='advogado_resp'>
                                <RiUser3Line />
                            </TextoLabel>
                            <CamposInput
                                type='text'
                                id='advogado_resp'
                                placeholder="E-mail"
                                value={advogadoResp}
                                readOnly
                            />
                        </ContainerLabelInput>
                        <ContainerLabelInput>
                            <TextoLabel htmlFor='telefone_escritorio'>
                                <RiPhoneLine />
                            </TextoLabel>
                            <CamposInput
                                type='text'
                                id='telefone_escritorio'
                                placeholder="(DDD)Número do WhatsApp"
                                value={telefoneEscritorioCreate}
                                onChange={(e) => setTelefoneEscritorioCreate(e.target.value)}
                            />
                        </ContainerLabelInput>
                        <ContainerLabelInput>
                            <TextoLabel htmlFor='nome_escritorio'>
                                <HiOutlineBuildingOffice />
                            </TextoLabel>
                            <CamposInput
                                type='text'
                                id='nome_escritorio'
                                placeholder='Nome do escritório'
                                value={nomeEscritorioCreate}
                                onChange={(e) => setNomeEscritorioCreate(e.target.value)}
                            />
                        </ContainerLabelInput>
                        {error && (
                            <StyledError>
                                {error.split('\n').map((line, index) => (
                                    <React.Fragment
                                        key={index}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </StyledError>
                        )}
                        {success && <StyledSuccess>
                            {success}
                        </StyledSuccess>}
                        <ContainerInputBtnBuscaProcesso style={{ gap: '2rem' }}>
                            <BotaoSubmit
                                type="submit">
                                Cadastrar
                            </BotaoSubmit>
                            <BotaoSubmit
                                type="button"
                                onClick={handleCloseModalCadEscri}>
                                Fechar
                            </BotaoSubmit>
                        </ContainerInputBtnBuscaProcesso>
                    </Formulario>
                </ModalCadEscri>
            )}

            {modalUserProfileOpen && (
                <ModalUserProfile onClose={handleCloseModalUserProfile}>
                    <Subtitulo style={{marginBottom: '2rem'}}>Minhas Informações</Subtitulo>
                    <ModalInternalContainer>
                        <p><strong>Nome completo:</strong> {nomeAdvogado}</p>
                        <p><strong>E-mail:</strong> {advogadoResp}</p>
                        <p><strong>Escritório:</strong> {nomeEscritorio}</p>
                        <p><strong>Telefone:</strong> {telefoneEscritorio}</p>
                        <p><strong>Clientes:</strong> {clientes.length}</p>
                        <p><strong>Processos:</strong> {processos.length}</p>
                        <p><strong>Agendamentos:</strong> {agendamentos.length}</p>
                        <p><strong>Diligências:</strong> {diligencias.length}</p>
                    </ModalInternalContainer>
                </ModalUserProfile>
            )}
        </ProtectedRoute>
    );
}
