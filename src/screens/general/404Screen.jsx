import { Container, LinkRedirect, Titulo } from "@/theme/GlobalStyles"
import { ImageNotFoundScreen } from "@/theme/NotFoundScreenStyles"
import Head from "next/head"

export default function NotFoundScreen() {
    return (
        <Container>
            <Head>
                <title>Página não encontrada</title>
            </Head>
            <Titulo>
                Página não encontrada.
            </Titulo>
            <LinkRedirect
                href='/'>
                Voltar para a página inicial
            </LinkRedirect>
            <ImageNotFoundScreen
                src="\assets\404-error.png" alt="404-error-image" />
        </Container>
    )
}