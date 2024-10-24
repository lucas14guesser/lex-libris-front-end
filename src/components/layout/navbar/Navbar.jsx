import { useUser } from '@/context/UserContext';
import { ContainerNavBar, ItemListaLogCad, LinkNavBar, LinkNavLogCad, ListaNavBar } from '@/theme/NavBarStyles';
import React from 'react';

function Navbar() {
    const { isAuthenticated } = useUser();

    return (
        <ContainerNavBar>
            <ListaNavBar>
                <li>
                    <LinkNavBar href="/">
                        <img src="/favicon.ico" alt="Logo Lex Libris" style={{ width: '7rem' }} />
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
                {isAuthenticated ? (
                    <ItemListaLogCad>
                        <LinkNavLogCad href="/userDashboard" style={{width: '14rem'}}>Painel do Usuário</LinkNavLogCad>
                    </ItemListaLogCad>
                ) : (
                    <ItemListaLogCad>
                        <LinkNavLogCad href="/login">Entrar</LinkNavLogCad>
                        <LinkNavLogCad href="/cadastro">Cadastrar</LinkNavLogCad>
                    </ItemListaLogCad>
                )}
            </ListaNavBar>
        </ContainerNavBar>
    );
}

export default Navbar;
