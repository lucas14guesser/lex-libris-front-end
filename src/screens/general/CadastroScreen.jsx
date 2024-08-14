import React from "react";
import Head from "next/head";
import CadastroFunction from "@/components/functions/CadastroFunctions";
import { BotaoSubmit, CamposInput, ContainerFormulario, ContainerLabelInput, Formulario, TextoLabel, Titulo } from "@/theme/GlobalStyles";
import { ContainerCadastro, ContainerLogoCadastro, LogoCadastro } from "@/theme/CadastroScreenStyles";
import { RiUser3Line, RiLockPasswordLine, RiIdCardLine, RiMailLine } from "react-icons/ri";
import Link from "next/link";

export default function CadastroScreen() {
    const {
        cpf,
        setCpf,
        senha,
        setSenha,
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
            <Link href="/">Ir para a Home</Link>
            <ContainerCadastro>
                <ContainerFormulario>
                    <ContainerLogoCadastro>
                        <LogoCadastro
                            src="\assets\lex-libris-logo.png" alt="lex-libris-logo"
                        />
                    </ContainerLogoCadastro>

                    <Titulo>
                        Cadastro
                    </Titulo>
                    <Formulario onSubmit={handleCadastro}>
                        <ContainerLabelInput>
                            <TextoLabel htmlFor="cpf"><RiUser3Line /></TextoLabel>
                            <CamposInput
                                type="text"
                                placeholder="CPF"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            />
                        </ContainerLabelInput>
                        <ContainerLabelInput>
                            <TextoLabel htmlFor="nome"><RiIdCardLine /></TextoLabel>
                            <CamposInput
                                type="text"
                                placeholder="Nome Completo"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </ContainerLabelInput>
                        <ContainerLabelInput>
                            <TextoLabel htmlFor="email"><RiMailLine /></TextoLabel>
                            <CamposInput
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </ContainerLabelInput>
                        <ContainerLabelInput>
                            <TextoLabel htmlFor="senha"><RiLockPasswordLine /></TextoLabel>
                            <CamposInput
                                type="password"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </ContainerLabelInput>
                        <BotaoSubmit type="submit">
                            Cadastrar
                        </BotaoSubmit>
                    </Formulario>
                    {error && <p>{error}</p>}
                </ContainerFormulario>
            </ContainerCadastro>
        </React.Fragment>
    );
}