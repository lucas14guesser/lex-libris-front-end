import Link from "next/link";
import styled from "styled-components";

export const TituloUser = styled.h1`
display: flex;
flex-direction: row;
align-items: center;
gap: 1rem;
font-size: 2rem;
margin: 0 0 0 3rem;
cursor: pointer;
color: #000D20;
font-family: "Roboto", sans-serif;
`
export const ContainerInputBtnBuscaProcesso = styled.div`
display: flex;
flex-direction: row;
margin-bottom: 2rem;
`
export const ContainerTxtCadastroEscritorio = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
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
    width: 19rem;
    padding: 3rem;
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
export const ListaClientes = styled.div`
  display: flex;
  justify-content: center;
  width: 654px;

  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    background-color: #FFFFFF;
    color: #000D20;
  }

  thead {
    background-color: #000D20;
    color: #FFFFFF;
  }

  th, td {
    padding: 12px 15px;
    border: 1px solid #000D20;
  }

  th {
    text-transform: uppercase;
  }

  td {
    color: #000D20;
  }
`
export const ListaProcessos = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
width: 1154px;

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: #FFFFFF;
    color: #000D20;
  }

  thead {
    background-color: #000D20;
    color: #FFFFFF;
  }
  th {
    text-transform: uppercase;
    padding: 12px 15px;
    border: 1px solid #000D20;
  }

`
export const TdListaProcessos = styled.td`
padding: 12px 15px;
border: 1px solid #000D20;
color: #000D20;
text-align: center;
`
export const DescricaoTd = styled(TdListaProcessos)`
width: 50%;
max-width: 200px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`
export const FuncoesListaProcessos = styled(TdListaProcessos)`
width: 20%;
max-width: 300px;
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
export const ContainerButtonsFunctions = styled.div`
display: flex;
flex-direction: column;
position: absolute;
margin: .7rem 0 0 6.2rem;
width: 12%;
background: #000D20;
`
export const BotaoLogout = styled.button`
border: none;
border: 1px solid #000D20;
padding: .7rem;
background: #000D20;
cursor: pointer;
font-size: 1rem;
color: #E6E6E6;
font-family: "Roboto", sans-serif;
        &:hover {
        transition: 0.3s;
        background: #FFFFFF;
        color: #000D20;
    }
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
width: 7rem;
    &:hover {
        transition: 0.3s;
        background: #000D20;
        color: #FFFFFF;
    }
`
export const ModalOverlay = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.5);
`
export const ModalContent = styled.div`
background-color: #FFFFFF;
padding: 20px;
border-radius: 10px;
max-width: 500px;
width: 100%;
color: #000D20;
`
export const ModalInternalContainer = styled.div`
  text-align: start;
`
export const ButtonEdit = styled.button`
background: #000D20;
color: #FFFFFF;
font-size: 1rem;
width: 2.5rem;
margin-left: 1rem;
border: 1px solid #000D20;
border-radius: 8px;
cursor: pointer;
  &:hover{
    transition: 0.3s;
    background: #FFFFFF;
    color: #000D20;
  }
`
export const SelectStatus = styled.select`
background-color: #FFFFFF;
color: #000D20;
border: 1px solid #000D20;
border-radius: 8px;
font-size: 1rem;
cursor: pointer;
  &:focus{
    outline: none;
    border-color: #000D20;
    background-color: #FFFFFF;
  }
`
export const OptionStatus = styled.option`
background-color: #FFFFFF;
color: #000D20;
`