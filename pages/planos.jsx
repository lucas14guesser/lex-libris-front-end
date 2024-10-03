import { Container, FontBold, Subtitulo, Titulo } from '@/theme/GlobalStyles'
import { BotaoAssinar, ContainerPlano, ContainerPlanos } from '@/theme/PlanosStyles'
import Head from 'next/head'
import React from 'react'

function planos() {
    return (
        <Container>
            <Head>
                <title>Lex Libris - Planos disponíveis</title>
            </Head>
            <Titulo>Planos Disponíveis</Titulo>
            <ContainerPlanos>
                <ContainerPlano>
                    <Subtitulo>Plano Mensal</Subtitulo>
                    <p style={{fontSize: '1.1rem'}}>Garanta já seu ChatBot por apenas</p>
                    <FontBold style={{fontSize: '1.1rem'}}>$20 por mês</FontBold>
                    <BotaoAssinar style={{marginTop: '1rem'}}>Assinar</BotaoAssinar>
                </ContainerPlano>
                <ContainerPlano>
                    <Subtitulo>Plano Trimestral</Subtitulo>
                    <p style={{fontSize: '1.1rem'}}>Garanta já seu ChatBot por apenas</p>
                    <FontBold style={{fontSize: '1.1rem'}}>$54 por 3 meses</FontBold>
                    <BotaoAssinar style={{marginTop: '2rem'}}>Assinar</BotaoAssinar>
                </ContainerPlano>
                <ContainerPlano>
                    <Subtitulo>Plano Semestral</Subtitulo>
                    <p style={{fontSize: '1.1rem'}}>Garanta já seu ChatBot por apenas</p>
                    <FontBold style={{fontSize: '1.1rem'}}>$102 por 6 meses</FontBold>
                    <BotaoAssinar style={{marginTop: '2rem'}}>Assinar</BotaoAssinar>
                </ContainerPlano>
                <ContainerPlano>
                    <Subtitulo>Plano Anual</Subtitulo>
                    <p style={{fontSize: '1.1rem'}}>Garanta já seu ChatBot por apenas</p>
                    <FontBold style={{fontSize: '1.1rem'}}>$216 por 12 meses</FontBold>
                    <BotaoAssinar style={{marginTop: '2rem'}}>Assinar</BotaoAssinar>
                </ContainerPlano>
            </ContainerPlanos>
        </Container>
    )
}

export default planos