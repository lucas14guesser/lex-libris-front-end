import RedefinirSenhaFunction from "@/components/functions/RedefinirSenhaFunctions"
import { BotaoSubmit, CamposInput, Container, ContainerFormulario, ContainerLabelInput, ContainerLogo, Formulario, StyledError, StyledSuccess, TextoLabel, Titulo } from "@/theme/GlobalStyles";
import React from "react";
import { RiLockPasswordLine } from "react-icons/ri";

export default function RedefinirSenhaScreen() {
    const {
        novaSenha,
        setNovaSenha,
        confirmarNovaSenha,
        setConfirmarNovaSenha,
        error,
        success,
        handleRedefinirSenha,
    } = RedefinirSenhaFunction();

    return (
        <React.Fragment>
            <Container>
                <ContainerFormulario>
                    <ContainerLogo />
                    <Titulo>
                        Redefinir Senha
                    </Titulo>
                    <Formulario
                        onSubmit={handleRedefinirSenha}>
                        <ContainerLabelInput>
                            <TextoLabel
                                htmlFor="novaSenha">
                                <RiLockPasswordLine />
                            </TextoLabel>
                            <CamposInput
                                type="password"
                                id="novaSenha"
                                placeholder="Digite sua nova senha"
                                value={novaSenha}
                                onChange={(e) => setNovaSenha(e.target.value)}
                            />
                        </ContainerLabelInput>
                        <ContainerLabelInput>
                            <TextoLabel
                                htmlFor="confirmarNovaSenha">
                                <RiLockPasswordLine />
                            </TextoLabel>
                            <CamposInput
                                type="password"
                                id="confirmarNovaSenha"
                                placeholder="Confirme sua nova senha"
                                value={confirmarNovaSenha}
                                onChange={(e) => setConfirmarNovaSenha(e.target.value)}
                            />
                        </ContainerLabelInput>
                        {error && <StyledError>
                            {error}
                        </StyledError>}
                        {success && <StyledSuccess>
                            {success}
                        </StyledSuccess>}
                        <BotaoSubmit
                            type="submit">
                            Redefinir Senha
                        </BotaoSubmit>
                    </Formulario>
                </ContainerFormulario>
            </Container>
        </React.Fragment>
    )
}