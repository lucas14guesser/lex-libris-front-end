import React from "react";
import Head from "next/head";
import CadastroFunction from "@/components/functions/CadastroFunctions";
import { BotaoSubmit, CamposInput, ContainerFormulario, ContainerLabelInput, Formulario, TextoLabel, Titulo, StyledError, Container, ContainerLogo, LogoFormulario } from "@/theme/GlobalStyles";
import { ContainerHaveAccountCadastrar, LinkHaveAccount } from "@/theme/CadastroScreenStyles";
import { RiUser3Line, RiLockPasswordLine, RiIdCardLine, RiMailLine } from "react-icons/ri";
import Link from "next/link";

export default function CadastroScreen() {
    const {
        cpf,
        setCpf,
        senha,
        setSenha,
        confirmarSenha,
        setConfirmarSenha,
        nome,
        setNome,
        email,
        setEmail,
        error,
        handleCadastro
    } = CadastroFunction();

    return (
        <React.Fragment>
            <Head>
                <title>Lex Libris - Cadastro</title>
            </Head>
            <Container>
                <ContainerFormulario>
                    <ContainerLogo>
                    </ContainerLogo>
                    <Titulo style={{marginTop: '3rem'}}>
                        Cadastro
                    </Titulo>
                    <Formulario
                        onSubmit={handleCadastro}>
                        <ContainerLabelInput>
                            <TextoLabel
                                htmlFor="cpf">
                                <RiUser3Line />
                            </TextoLabel>
                            <CamposInput
                                type="text"
                                id="cpf"
                                placeholder="CPF"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            />
                        </ContainerLabelInput>
                        <ContainerLabelInput>
                            <TextoLabel
                                htmlFor="nome">
                                <RiIdCardLine />
                            </TextoLabel>
                            <CamposInput
                                type="text"
                                id="nome"
                                placeholder="Nome Completo"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </ContainerLabelInput>
                        <ContainerLabelInput>
                            <TextoLabel
                                htmlFor="email">
                                <RiMailLine />
                            </TextoLabel>
                            <CamposInput
                                type="text"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </ContainerLabelInput>
                        <ContainerLabelInput>
                            <TextoLabel
                                htmlFor="senha">
                                <RiLockPasswordLine />
                            </TextoLabel>
                            <CamposInput
                                type="password"
                                id="senha"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </ContainerLabelInput>
                        <ContainerLabelInput>
                            <TextoLabel
                                htmlFor="confirmarSenha"
                            ><RiLockPasswordLine />
                            </TextoLabel>
                            <CamposInput
                                type="password"
                                id="repetirSenha"
                                placeholder="Repetir Senha"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                            />
                        </ContainerLabelInput>
                        <ContainerHaveAccountCadastrar>
                            <LinkHaveAccount
                                href='/login'>
                                Sou cadastrado
                            </LinkHaveAccount>
                            <BotaoSubmit
                                type="submit">
                                Cadastrar
                            </BotaoSubmit>
                        </ContainerHaveAccountCadastrar>
                    </Formulario>
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
                </ContainerFormulario>
            </Container>
        </React.Fragment>
    );
}