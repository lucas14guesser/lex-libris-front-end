import styled from "styled-components";

export const ContainerPlanos = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
max-width: 80%;
flex-wrap: wrap;
align-items: center;
gap: 2rem;
margin-top: 4rem;
`
export const ContainerPlano = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
align-items: center;
background: #FFFFFF;
border: 1px solid #000D20;
border-radius: 12px;
padding: 2rem;
`
export const BotaoAssinar = styled.button`
display: flex;
flex-direction: row;
justify-content: center;
gap: .5rem;
font-size: 1rem;
background: #000D20;
border-radius: 8px;
color: #FFFFFF;
padding: .7rem;
text-transform: uppercase;
font-family: "Roboto", sans-serif;
border: 1px solid #000D20;
cursor: pointer;
width: 7rem;
    &:hover {
        transition: 0.3s;
        background: #FFFFFF;
        color: #000D20;
    }
`