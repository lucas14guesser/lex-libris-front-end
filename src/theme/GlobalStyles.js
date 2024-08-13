import { createGlobalStyle, styled } from "styled-components"

export const GlobalStyle = createGlobalStyle`
html, body {
font-family: "Gill Sans", sans-serif;
background-color: #E6E6E6;
line-height: 1;
}
`
export const Titulo = styled.h1`
font-size: 2.5rem;
color: #000000;
margin-bottom: 3rem;
`
export const ContainerFormulario = styled.div`
display: flex;
flex-direction: column;
flex-wrap: wrap;
justify-content: center;
text-align: center;
align-items: center;
padding: 7rem;
background: #FFFFFF;
border: .1rem solid #E6E6E6;
border-radius: 2.7rem;
`
export const Formulario = styled.form`
display: flex;
justify-content: center;
text-align: start;
align-items: center;
flex-direction: column;
flex-wrap: wrap;
gap: .7rem;
`
export const TextoLabel = styled.label`
font-size: 1.1rem;
`
export const CamposInput = styled.input`
width: 15rem;
border: .1rem solid #000000;
border-radius: .7rem;
background: #FFFFFF;
padding: .5rem;
`