import CadastroFunction from "@/components/functions/CadastroFunctions";

export default function CadastroScreen() {
    const {
        cpf,
        setCpf,
        senha,
        setSenha,
        nome,
        setNome,
        error,
        handleCadastro
    } = CadastroFunction();
    
    return (
        <div>
            <h1>Cadastro</h1>
            <form onSubmit={handleCadastro}>
                <input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}