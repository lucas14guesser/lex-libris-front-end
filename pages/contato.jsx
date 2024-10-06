import { BotaoSubmit, CamposInput, Container, ContainerFormulario, ContainerLabelInput, Formulario, TextoLabel, Titulo, TxtArea } from '@/theme/GlobalStyles'
import React, { useRef } from 'react'
import { RiUser3Line, RiChat3Line } from 'react-icons/ri'
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

function contato() {
    return (
        <Container>
            <ContainerFormulario>
                <Titulo style={{margin: '3rem 0'}}>Contate-nos</Titulo>
                <p style={{marginBottom: '1rem'}}>Entre em contato conosco através de e-mail se estiver com alguma dúvida.</p>
                <Formulario action="">
                    <ContainerLabelInput>
                        <TextoLabel htmlFor='email'>
                            <RiUser3Line />
                        </TextoLabel>
                        <CamposInput type="email" name='email' placeholder='E-mail' />
                    </ContainerLabelInput>
                    <ContainerLabelInput>
                        <TextoLabel htmlFor='nome'>
                            <MdOutlineDriveFileRenameOutline />
                        </TextoLabel>
                        <CamposInput type="text" name='nome' placeholder='Nome completo' />
                    </ContainerLabelInput>
                    <ContainerLabelInput>
                        <TextoLabel htmlFor='descricao'>
                            <RiChat3Line />
                        </TextoLabel>
                        <TxtArea type='text' name="descricao"  placeholder='Descrição' />
                    </ContainerLabelInput>
                    <BotaoSubmit>Enviar</BotaoSubmit>
                </Formulario>
            </ContainerFormulario>
        </Container>
    )
}

export default contato