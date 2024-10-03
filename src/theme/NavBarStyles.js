import Link from "next/link";
import styled from "styled-components";

export const ContainerNavBar = styled.div`
background: #000D20;
padding: .7rem 0;
margin-bottom: 4rem;
`
export const ListaNavBar = styled.ul`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-evenly;
list-style: none;
`
export const LinkNavBar = styled(Link)`
text-decoration: none;
color: #FFFFFF;
    &:hover {
        color: #E6E6E6;
    }
`
export const ItemListaLogCad = styled.li`
display: flex;
flex-direction: row;
align-items: center;
gap: 1rem;
`
export const LinkNavLogCad = styled(Link)`
background: #000D20;
color: #FFFFFF;
padding: .7rem;
width: 7rem;
border: 1px solid #FFFFFF;
border-radius: 8px;
text-align: center;
text-decoration: none;
    &:hover {
    transition: 0.3s;
        background: #FFFFFF;
        color: #000D20;
    }
`