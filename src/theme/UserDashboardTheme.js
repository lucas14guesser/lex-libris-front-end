import Link from "next/link";
import styled from "styled-components";

export const TituloUser = styled.h1`
font-size: 2rem;
margin: 3rem 0 0 3rem;
color: #000D20;
font-family: "Roboto", sans-serif;
`
export const ContainerInputBtnBuscaProcesso = styled.div`
display: flex;
flex-direction: row;
margin: 3rem 0 2rem 0;
`
export const InputBuscaProcesso = styled.input`
width: 20rem;
padding: .7rem;
border: 1px solid #000D20;
border-right: none;
border-radius: 12px 0 0 12px;
margin: 0;
    &:focus {
        outline: none;
    }
    &::placeholder {
        font-size: 1rem;
        color: #000D20;
    }
`
export const BtnBuscaProcesso = styled.button`
background: #FFFFFF;
color: #000D20;
padding: .7rem;
border: 1px solid #000D20;
border-left: none;
border-radius: 0 12px 12px 0;
cursor: pointer;
font-size: 1.1rem;
    &:hover {
        transition: 0.3s;
        background: #000D20;
        color: #FFFFFF;
    }
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
display: flex;
flex-direction: row;
justify-content: center;
gap: 1rem;
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
export const ListaProcessos = styled.ol`
display: flex;
flex-direction: column;
justify-content: center;
background: #FFFFFF;
border: 1px solid #000D20;
border-radius: 12px;
width: 954px;
margin: 0;
`
export const ListaProcessosLi = styled.li`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
margin-right: 2.5rem;
border-bottom: 1px solid #E6E6E6;
gap: 3rem;
`
export const ListaProcessosTxt = styled.p`
font-size: 1rem;
`
export const DescricaoTxt = styled(ListaProcessosTxt)`
text-align: center;
flex-basis: 35%;
text-align: left;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`
export const BotoesListaProcesso = styled.div`
display: flex;
flex-direction: row;
gap: .5rem;
margin: 0;
`
export const BotaoEditIcone = styled.button`
display: flex;
flex-direction: row;
justify-content: center;
gap: .5rem;
font-size: 1rem;
background: #FFFFFF;
border-radius: 8px;
color: #000D20;
padding: .3rem;
text-transform: uppercase;
font-family: "Roboto", sans-serif;
border: 1px solid #000D20;
cursor: pointer;
width: 6.6rem;
    &:hover {
        transition: 0.3s;
        background: #000D20;
        color: #FFFFFF;
    }
`