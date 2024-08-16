import { Container } from "@/theme/GlobalStyles"
import Link from "next/link"

export default function HomeScreen() {
    return (
        <Container>
            <h1>Você está na página principal</h1>
            <Link href='/login'>Ir para Login</Link>
            <Link href='/cadastro'>Ir para Cadastro</Link>
        </Container>
    )
}