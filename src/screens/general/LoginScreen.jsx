import LoginFunctions from "@/components/functions/LoginFunctions";

export default function LoginScreen() {
    const {
        cpf,
        setCpf,
        senha,
        setSenha,
        handleLogin
    } = LoginFunctions();
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}