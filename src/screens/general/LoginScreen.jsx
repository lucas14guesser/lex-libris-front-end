import LoginFunctions from "@/components/functions/LoginFunctions";
import { CamposInput, ContainerFormulario, Formulario, TextoLabel, Titulo } from "@/theme/GlobalStyles";
import { ContainerLogin } from "@/theme/LoginScreenStyles";

export default function LoginScreen() {
    const {
        cpf,
        setCpf,
        senha,
        setSenha,
        handleLogin
    } = LoginFunctions();
    return (
        <ContainerLogin>
            <ContainerFormulario>
                <Titulo>Entrar</Titulo>
                <Formulario onSubmit={handleLogin}>
                    <TextoLabel htmlFor="cpf">CPF</TextoLabel>
                    <CamposInput
                        type="text"
                        placeholder="Digite seu CPF..."
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    />
                    <TextoLabel htmlFor="senha">Senha</TextoLabel>
                    <CamposInput
                        type="password"
                        placeholder="Digite aqui sua senha..."
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <button type="submit">Entrar</button>
                </Formulario>
            </ContainerFormulario>
        </ContainerLogin>
    );
}