import React from "react";
import { Container, ContainerFormulario, ContainerLogo, LinkRedirect, Titulo } from "@/theme/GlobalStyles";
import { ContainerTxtLinkPaginaConfirmacao, TxtPaginaConfirmacao } from "@/theme/PaginaConfirmacaoScreenStyles";
import Head from "next/head";

export default function PaginaConfirmacaoScreen() {
    return (
        <React.Fragment>
            <Head>
                <title>Lex Libris - Página de confirmação</title>
            </Head>
            <Container>
                <ContainerFormulario>
                    <ContainerLogo />
                    <Titulo>
                        E-mail confirmado
                    </Titulo>
                    <ContainerTxtLinkPaginaConfirmacao>
                        <TxtPaginaConfirmacao>
                            Seu e-mail foi confirmado com sucesso!
                        </TxtPaginaConfirmacao>
                        <LinkRedirect
                            href='/userDashboard'>
                            Ir para seu usuario
                        </LinkRedirect>
                    </ContainerTxtLinkPaginaConfirmacao>
                </ContainerFormulario>
            </Container>
        </React.Fragment>
    )
}