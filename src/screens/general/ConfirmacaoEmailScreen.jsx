import React from "react";
import { ContainerTxtLinkConfirmacaoEmail, TxtConfirmacaoEmail } from "@/theme/ConfirmacaoEmailScreenStyles";
import { Container, ContainerFormulario, ContainerLogo, LinkRedirect, LogoFormulario, Titulo } from "@/theme/GlobalStyles";
import Head from "next/head";

export default function ConfirmacaoEmailScreen() {
    return (
        <React.Fragment>
            <Head>
                <title>Lex Libris - Confirme seu e-mail</title>
            </Head>
            <Container>
                <ContainerFormulario>
                    <ContainerLogo>
                    </ContainerLogo>
                    <Titulo>Confirme seu e-mail</Titulo>
                    <ContainerTxtLinkConfirmacaoEmail>
                        <TxtConfirmacaoEmail>Foi enviado para você um e-mail de confirmação.</TxtConfirmacaoEmail>
                        <TxtConfirmacaoEmail>Por favor cheque sua caixa de entrada ou Spam.</TxtConfirmacaoEmail>
                        <TxtConfirmacaoEmail>Para acessar o sistema, é necesserário validar o seu e-mail</TxtConfirmacaoEmail>
                        <LinkRedirect href="/">Ir para a Home</LinkRedirect>
                    </ContainerTxtLinkConfirmacaoEmail>
                </ContainerFormulario>
            </Container>
        </React.Fragment>
    )
}