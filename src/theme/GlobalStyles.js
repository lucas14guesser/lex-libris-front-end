import { createGlobalStyle, styled } from "styled-components"
import Link from "next/link"

export const GlobalStyle = createGlobalStyle`
#root, html, body {
background-color: #E6E6E6;
line-height: 1;
color: #000D20;
margin: 0;
padding: 0;
border: 0;
font-size: 100%;
vertical-align: baseline;
font-family: "Roboto", sans-serif;
}
`
export const Titulo = styled.h1`
font-size: 2rem;
margin-top: 3rem;
color: #000D20;
font-family: "Roboto", sans-serif;
`
export const Subtitulo = styled.h2`
font-size: 1.5rem;
color: #000D20;
font-family: "Roboto", sans-serif;
`
export const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;
align-items: center;
flex-wrap: wrap;
width: 100%;
`
export const ContainerLogo = styled.div`
width: 100%;
background-image: url("/assets/lex-libris-logo.png");
background-size: cover;
background-position: center;
background-repeat: no-repeat;
border-top-left-radius: 2.7rem;
border-top-right-radius: 2.7rem;
height: 17.5rem;
`
export const ContainerFormulario = styled.div`
background: #FFFFFF;
border: .1rem solid #E6E6E6;
border-radius: 2.7rem;
width: 40rem;
`
export const Formulario = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
flex-wrap: wrap;
gap: 2rem;
padding: 1rem 4rem;
`
export const ContainerLabelInput = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`
export const TextoLabel = styled.label`
font-size: 1.25rem;
font-family: "Roboto", sans-serif;
`
export const CamposInput = styled.input`
	width: 15rem;
    border: none;
	border-bottom: .1rem solid #000D20;
	background: #FFFFFF;
	padding: .5rem;
    outline: none;

    &:focus {
        transition: 0.13s;
        border-bottom: .13rem solid #000D20;
    }
    &::placeholder {
        color: #000D20;
        font-size: 1rem;
        font-family: "Roboto", sans-serif;

    }
`
export const BotaoSubmit = styled.button`
padding: .7rem;
width: 10rem;
background: #000D20;
border: .1rem solid #000D20;
border-radius: .7rem;
margin-top: 1rem;
cursor: pointer;
color: #FFFFFF;
font-size: 1.1rem;
font-family: "Roboto", sans-serif;

    &:hover {
        transition: 0.3s;
        background: #FFFFFF;
        color: #000D20;
    }
`
export const StyledError = styled.p`
font-size: .9rem;
color: red;
margin-bottom: 1rem;
white-space: pre-wrap;
`
export const StyledSuccess = styled.p`
font-size: .9rem;
color: green;
margin-bottom: 1rem;
white-space: pre-wrap;
`
export const LinkRedirect = styled(Link)`
font-size: 1.1rem;
color: #000D20;
text-decoration: underline;
margin-top: 1rem;
`