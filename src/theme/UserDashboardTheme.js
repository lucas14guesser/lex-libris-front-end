import Link from "next/link";
import styled from "styled-components";

export const TituloUser = styled.h1`
font-size: 2rem;
margin: 3rem 0 0 3rem;
color: #000D20;
font-family: "Roboto", sans-serif;
`
export const ContainerUserDashboard = styled.div`
display: flex;
flex-direction: column;
flex-wrap: wrap;
justify-content: center;
align-items: center;
text-align: center;
`
export const ContainerProcessosAndEnc = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
    margin: 2rem 0;
`
export const LinkProcessosAndEnc = styled(Link)`
    width: 245px;
    padding: 2rem;
    border: 1px solid #E6E6E6;
    border-radius: 16px;
    background: #000D20;
    color: #E6E6E6;
    text-decoration: none;
        &:hover {
            transition: 0.3s;
            background: #FFFFFF;
            border-color: #000D20;
            color: #000D20;
        }
`
export const TxtUsuarioDashboard = styled.p`
font-size: 1.3rem;
`
export const ListaClientes = styled.ol`
background: #FFFFFF;
border: 1px solid #000D20;
border-radius: 12px;
width: 654px;
margin: 0;
`
export const ListaClientesLi = styled.li`
padding: 1rem 0;
margin-right: 2.5rem;
border-bottom: 1px solid #E6E6E6;
`
export const ListaClientesTxt = styled.p`
font-size: 1rem;
margin: 0;
padding: 0;
`
export const ContainerTituloPerfilLogout = styled.div`
display: flex;
flex-direction: column;
justify-content: start;
gap: 1rem;
margin: 3rem 0 0 3rem;
`
export const ContainerPerfilLogout = styled.div`
display: flex;
margin-left: 2rem;
flex-direction: row;
align-items: center;
gap: 2rem;
`
export const BotaoLogout = styled.button`
border: none;
border-bottom: 1px solid #000D20;
padding: 0 1rem .2rem 1rem;
margin: 3rem 0 0 3rem;
background: #E6E6E6;
cursor: pointer;
font-size: 1rem;
color: #000D20;
font-family: "Roboto", sans-serif;
        &:hover {
        transition: 0.13s;
        border-bottom: .13rem solid #000D20;
    }
`