import Link from "next/link";
import styled from "styled-components";

export const ContainerFooter = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
background: #000D20;
color: #FFFFFF;
align-items: flex-start;
padding: 3rem;
margin-top: 9rem;
`
export const ContainerInfoFooter = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
align-items: flex-start;
margin: 0 7rem;
`
export const TxtFooter = styled.p`
font-size: 1rem;
text-align: justify;
`
export const ListaFooter = styled.ul`
display: flex;
flex-direction: column;
gap: .5rem;
list-style: none;
`
export const LinksAcessoFooter = styled(Link)`
text-decoration: none;
color: #FFFFFF;
    &:hover {
        color: #E6E6E6;
    }
`