import styled from "styled-components";
import Link from "next/link";

export const ContainerLogin = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;
align-items: center;
flex-wrap: wrap;
margin-top: 10rem;
width: 100%;
`
export const ContainerLogoLogin = styled.div`
width: 100%;
background-image: url("/assets/lex-libris-logo.png");
background-size: cover;
background-position: center;
background-repeat: no-repeat;
border-top-left-radius: 2.7rem;
border-top-right-radius: 2.7rem;
height: 17.5rem;
`
export const LogoLogin = styled.img`
width: 10rem;
`
export const ContainerLoginForgot = styled.div`
display: flex;
flex-wrap: wrap;
flex-direction: row;
gap: 2rem;
align-items: baseline;
`
export const LinkForgot = styled(Link)`
font-size: 1rem;
text-decoration: underline;
color: #000D20;
`
export const LinkCadastreSe = styled(Link)`
padding: .7rem;
width: 10rem;
background: #FFFFFF;
border-radius: .7rem;
cursor: pointer;
font-size: 1.1rem;
font-family: "Roboto", sans-serif;
text-decoration: none;
color: #000D20;
    &:hover {
        transition: 0.3s;
        background: #E6E6E6;
    }
`