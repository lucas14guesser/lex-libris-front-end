import Link from "next/link";

export default function confirmacaoEmail() {
    return (
        <>
            <h1>Pagina de confirmação de email</h1>
            <p>Seu email foi confirmado com sucesso!</p>
            <Link href='/userDashboard'>Ir para seu usuario</Link>
        </>
    )
}