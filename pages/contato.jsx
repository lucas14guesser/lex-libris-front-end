import { BotaoSubmit, CamposInput, Container, ContainerFormulario, ContainerLabelInput, Formulario, StyledError, StyledSuccess, TextoLabel, Titulo, TxtArea } from '@/theme/GlobalStyles'
import React, { useState } from 'react'
import { RiUser3Line, RiChat3Line } from 'react-icons/ri'
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import axios from 'axios';

function contato() {
    const [emailDestinatario, setEmailDestinatario] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [descricao, setDescricao] = useState('');
    const [sucess, setSucess] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleContactMail = async (e) => {
        e.preventDefault();

        setLoading(true);

        if (!emailDestinatario || !nomeUsuario || !descricao) {
            setError('Por favor, preencha todos os campos.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/lex/contactus-mail', {
                emailDestinatario,
                nomeUsuario,
                descricao
            });

            if (response.status === 200) {
                setSucess('E-mail enviado com sucesso!');
                setEmailDestinatario('');
                setNomeUsuario('');
                setDescricao('');
            } else {
                console.error('Erro ao enviar e-mail. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Container style={{marginTop: '7rem'}}>
            <ContainerFormulario>
                <Titulo style={{ margin: '3rem 0' }}>Contate-nos</Titulo>
                <p style={{ marginBottom: '1rem' }}>Entre em contato conosco através de e-mail se estiver com alguma dúvida.</p>
                <Formulario onSubmit={handleContactMail}>
                    <ContainerLabelInput>
                        <TextoLabel htmlFor='email'>
                            <RiUser3Line />
                        </TextoLabel>
                        <CamposInput type="email" name='email' placeholder='E-mail' value={emailDestinatario} onChange={(e) => setEmailDestinatario(e.target.value)} />
                    </ContainerLabelInput>
                    <ContainerLabelInput>
                        <TextoLabel htmlFor='nome'>
                            <MdOutlineDriveFileRenameOutline />
                        </TextoLabel>
                        <CamposInput type="text" name='nome' placeholder='Nome completo' value={nomeUsuario} onChange={(e) => setNomeUsuario(e.target.value)} />
                    </ContainerLabelInput>
                    <ContainerLabelInput>
                        <TextoLabel htmlFor='descricao'>
                            <RiChat3Line />
                        </TextoLabel>
                        <TxtArea type='text' name="descricao" placeholder='Descrição' value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                    </ContainerLabelInput>
                    {loading ? (
                        <p>Enviando...</p>
                    ) : (
                        <>
                            {error && (
                                <StyledError>
                                    {error}
                                </StyledError>
                            )}
                            {sucess && (
                                <StyledSuccess>
                                    {sucess}
                                </StyledSuccess>
                            )}
                        </>
                    )}
                    <BotaoSubmit type='submit' disabled={loading}>Enviar</BotaoSubmit>
                </Formulario>
            </ContainerFormulario>
        </Container>
    )
}

export default contato