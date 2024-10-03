import { Container, Titulo } from "@/theme/GlobalStyles"
import Head from "next/head"

export default function HomeScreen() {
    return (
        <Container>
            <Head>
                <title>Lex Libris - Página Inicial</title>
            </Head>
            <Titulo>Você está na página principal</Titulo>
        </Container>
    )
}