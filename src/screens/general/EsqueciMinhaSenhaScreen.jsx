import EsqueciMinhaSenhaFunctions from "@/components/functions/EsqueciMinhaSenhaFunctions"
import { BotaoSubmit, CamposInput, Container, ContainerFormulario, ContainerLabelInput, ContainerLogo, Formulario, StyledError, StyledSuccess, TextoLabel, Titulo } from "@/theme/GlobalStyles";
import { RiMailLine } from 'react-icons/ri'

export default function EsqueciMinhaSenhaScreen() {
    const {
        email,
        setEmail,
        error,
        success,
        handleEmailForgotPass
    } = EsqueciMinhaSenhaFunctions();

    return (
        <Container>
            <ContainerFormulario>
                <ContainerLogo />
                <Titulo>
                    Esqueci minha senha
                </Titulo>
                <Formulario
                    onSubmit={handleEmailForgotPass}>
                    <ContainerLabelInput>
                        <TextoLabel
                            htmlFor="email">
                            <RiMailLine />
                        </TextoLabel>
                        <CamposInput
                            type="email"
                            id="email"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        Enviar
                    </BotaoSubmit>
                </Formulario>
            </ContainerFormulario>
        </Container>
    )
}