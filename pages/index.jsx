import { ContainerCadastro } from "@/theme/CadastroScreenStyles"
import Link from "next/link"

export default function HomeScreen() {
    return (
        <ContainerCadastro>
            <h1>Você está na página principal</h1>
            <Link href='/login'>Ir para Login</Link>
            <Link href='/cadastro'>Ir para Cadastro</Link>
        </ContainerCadastro>
    )
}