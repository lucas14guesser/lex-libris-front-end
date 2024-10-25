import Link from 'next/link';
import styled from 'styled-components';

export const HeroSection = styled.section`
padding: 12rem 1rem;
text-align: center;
color: #000D20;
background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/assets/bghome.png") no-repeat;
background-repeat: no-repeat;
background-size: cover;
`
export const HeroSectionBtn = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
margin: 2rem 0 0 0;
`
export const HeroButton = styled(Link)`
display: flex;
width: 15rem;
justify-content: center;
background-color: rgba(255, 255, 255, 0.2);
color: #FFFFFF;
border: 1px solid rgba(255, 255, 255, 0.5);
padding: 1.3rem;
margin: 0 1rem;
font-size: 1em;
cursor: pointer;
border-radius: 12px;
transition: background-color 0.3s, color 0.3s;
text-decoration: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
    color: #000D20;
  }
`
export const FuncionalidadesSection = styled.section`
display: flex;
justify-content: space-around;
padding: 50px 20px;
background-color: #FFFFFF;
`
export const FuncionalidadeCard = styled.div`
background-color: #000D20;
border-radius: 8px;
padding: 20px;
width: 30%;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.15);
text-align: center;
color: #FFFFFF;
`
export const FuncionalidadeTitle = styled.h3`
font-size: 1.5em;
margin-bottom: 15px;
`
export const FuncionalidadeDescription = styled.p`
font-size: 1em;
color: #FFFFFF;
`
export const BeneficiosSection = styled.section`
padding: 50px 20px;
text-align: center;
`
export const BeneficioItem = styled.p`
font-size: 1.2em;
margin: 10px 0;
`
export const CTASection = styled.section`
background-color: #FFFFFF;
color: #000D20;
text-align: center;
padding: 50px 20px;
`
export const CTATitle = styled.h2`
font-size: 2em;
margin-bottom: 20px;
`
export const CTAText = styled.p`
font-size: 1.2em;
margin-bottom: 30px;
`
export const CTAButton = styled(Link)`
display: flex;
width: 15rem;
justify-content: center;
background-color: #000D20;
color: #FFFFFF;
border: 1px solid #000D20;
padding: 1.3rem;
margin: 0 1rem;
font-size: 1em;
cursor: pointer;
border-radius: 12px;
transition: background-color 0.3s;
text-decoration: none;

  &:hover {
    background-color: #FFFFFF;
    color: #000D20;
  }
`