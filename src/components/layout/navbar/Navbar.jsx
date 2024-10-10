import { ContainerNavBar, ItemListaLogCad, LinkNavBar, LinkNavLogCad, ListaNavBar } from '@/theme/NavBarStyles'
import React from 'react'

function Navbar() {
    return (
        <ContainerNavBar>
            <ListaNavBar>
                <li>
                    <LinkNavBar href="/">
                        <img src="./favicon.ico" alt="Logo Lex Libris" style={{ width: '7rem' }} />
                    </LinkNavBar>
                </li>
                <li>
                    <LinkNavBar href="/servicos">Serviços</LinkNavBar>
                </li>
                <li>
                    <LinkNavBar href="/planos">Planos</LinkNavBar>
                </li>
                <li>
                    <LinkNavBar href="/contato">Contate-nos</LinkNavBar>
                </li>
                <ItemListaLogCad>
                    <LinkNavLogCad href="/login">Entrar</LinkNavLogCad>
                    <LinkNavLogCad href="/cadastro">Cadastrar</LinkNavLogCad>
                </ItemListaLogCad>
            </ListaNavBar>
        </ContainerNavBar>
    )
}

export default Navbar