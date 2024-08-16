import React from "react";
import Head from "next/head";
import LoginFunctions from "@/components/functions/LoginFunctions";
import { BotaoSubmit, CamposInput, ContainerFormulario, ContainerLabelInput, Formulario, TextoLabel, Titulo, StyledError, Container, ContainerLogo, LogoFormulario } from "@/theme/GlobalStyles";
import { ContainerLoginForgot, LinkCadastreSe, LinkForgot } from "@/theme/LoginScreenStyles";
import { RiUser3Line, RiLockPasswordLine } from "react-icons/ri";
import Link from "next/link";

export default function LoginScreen() {
    const {
        email,
        setEmail,
        senha,
        setSenha,
        error,
        handleLogin
    } = LoginFunctions();
    return (
        <React.Fragment>
            <Head>
                <title>Lex Libris - Login</title>
            </Head>
            <Link
                href="/">
                Ir para a Home
            </Link>
            <Container>
                <ContainerFormulario>
                    <ContainerLogo>
                    </ContainerLogo>
                    <Titulo>
                        Login
                    </Titulo>
                    <Formulario
                        onSubmit={handleLogin}>
                        <ContainerLabelInput>
                            <TextoLabel
                                htmlFor="email">
                                <RiUser3Line />
                            </TextoLabel>
                            <CamposInput
                                type="text"
                                placeholder="Digite aqui seu e-mail..."
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
                                placeholder="Digite aqui sua senha..."
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </ContainerLabelInput>
                        <LinkForgot
                            href="/esqueciMinhaSenha">
                            Esqueceu sua senha?
                        </LinkForgot>
                        <ContainerLoginForgot>
                            <LinkCadastreSe
                                href='/cadastro'>
                                Criar conta
                            </LinkCadastreSe>
                            <BotaoSubmit
                                type="submit">
                                Entrar
                            </BotaoSubmit>
                        </ContainerLoginForgot>
                    </Formulario>
                    {error && <StyledError>
                        {error}
                    </StyledError>}
                </ContainerFormulario>
            </Container>
        </React.Fragment>
    );
}