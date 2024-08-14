import Link from "next/link";

export default function confirmacaoEmail() {
    return (
        <>
            <h1>Confirme seu email</h1>
            <p>Para poder entrar no seu usuario, você precisa verificar seu email.</p>
            <Link href="/">Ir para a Home</Link>
        </>
    )
}