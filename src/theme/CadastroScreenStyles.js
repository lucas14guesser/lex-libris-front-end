import Link from "next/link";
import styled from "styled-components";

export const ContainerHaveAccountCadastrar = styled.div`
display: flex;
flex-wrap: wrap;
flex-direction: row;
gap: 2rem;
align-items: baseline;
`
export const LinkHaveAccount = styled(Link)`
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