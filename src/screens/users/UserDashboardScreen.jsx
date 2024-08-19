import Link from "next/link";
import useUserDashboard from "../../components/functions/UserDashboardFunctions";

export default function UserDashboardScreen() {
    const { nomeAdvogado, userEmail, nomeEscritorio } = useUserDashboard();

    return (
        <>
            <div>
                <h1>Bem-vindo, {nomeAdvogado}!</h1>
                <p>Email: {userEmail}</p>
            </div>

            <div>
                <h2>Visão Geral</h2>
                <div>
                    {nomeEscritorio ? (
                        <p>Escritório Atual: {nomeEscritorio}</p>
                    ) : (
                        <p>Você ainda não cadastrou um escritório. Por favor, complete seu cadastro para acessar todas as funcionalidades.</p>
                    )}
                </div>
            </div>
        </>
    );
}
