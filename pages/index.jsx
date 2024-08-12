import Link from "next/link"

export default function HomeScreen() {
    return (
        <div>
            <h1>Você está na página principal</h1>
            <Link href='/login'>Ir para Login</Link>
            <Link href='/cadastro'>Ir para Cadastro</Link>
        </div>
    )
}