import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import useUserDashboard from '@/components/functions/UserDashboardFunctions';
import { ContainerConfig, DivLabelInput, DivSubTitleArrow, FormularioConfig, SaveButton, TextoLabelConfig, TimeInputContainer } from '@/theme/ConfiguracaoEscritorioStyles';
import { LinkBackToDashboard, StyledError, StyledSuccess, Subtitulo, Titulo } from '@/theme/GlobalStyles';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const ConfigurarEscritorio = () => {
    const { telefoneEscritorio } = useUserDashboard();
    const [horarios, setHorarios] = useState([]);
    const [sucess, setSucess] = useState('');
    const [error, setError] = useState('')
    const [horariosTrabalhos, setHorariosTrabalho] = useState(false);

    const carregarHorarios = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/lex/verificar-configuracao/${telefoneEscritorio}`);
            if (response.status === 200 && response.data.result) {
                setHorarios(response.data.result);
            }
        } catch (error) {
            console.error('Erro ao carregar horários:', error);
        }
    };

    const handleHorarioChange = (index, campo, valor) => {
        setHorarios(prevHorarios => {
            const novosHorarios = [...prevHorarios];
            novosHorarios[index][campo] = valor;
            return novosHorarios;
        });
    };

    const handleSalvar = async () => {
        setSucess('');
        setError
        if (!telefoneEscritorio) {
            setError('O número de telefone do escritório não está disponível.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3001/lex/configurar-escritorio/${telefoneEscritorio}/horarios`, {
                horarios,
            });

            if (response.status === 200) {
                setSucess('Configurações salvas com sucesso!');
                carregarHorarios();
            }
        } catch (error) {
            console.error('Erro ao salvar configurações:', error);
            setError('Erro ao salvar configurações. Tente novamente.');
        }
    };

    const handleClickHorariosTrabalho = () => {
        setHorariosTrabalho(!horariosTrabalhos);
    }

    useEffect(() => {
        if (telefoneEscritorio) {
            carregarHorarios();
        }
    }, [telefoneEscritorio]);


    return (
        <React.Fragment>
            <LinkBackToDashboard href='/userDashboard'>
                <FaArrowLeft />
                Voltar ao Painel do usuário
            </LinkBackToDashboard>
            <ContainerConfig>
                <Head>
                    <title>Lex Libris - Configurar Escritório</title>
                </Head>
                <Titulo style={{ marginBottom: '1rem' }}>Configurações do Escritório</Titulo>
                <DivSubTitleArrow>
                    <Subtitulo onClick={handleClickHorariosTrabalho}>Horários de trabalho</Subtitulo>
                    <FaArrowRight />
                </DivSubTitleArrow>

                {horariosTrabalhos && (
                    <FormularioConfig onSubmit={(e) => e.preventDefault()}>
                        {horarios.length > 0 ? (
                            horarios.map((horario, index) => (
                                <DivLabelInput key={index}>
                                    <TextoLabelConfig>
                                        <p>{horario.dia}:</p>
                                        <input
                                            type="checkbox"
                                            checked={horario.ativo === 1}
                                            onChange={(e) =>
                                                handleHorarioChange(index, 'ativo', e.target.checked ? 1 : 0)
                                            }
                                        />
                                        <p>Ativar horário</p>
                                    </TextoLabelConfig>
                                    {horario.ativo === 1 && (
                                        <TimeInputContainer>
                                            <label>
                                                Início:
                                                <input
                                                    type="time"
                                                    value={horario.inicio}
                                                    onChange={(e) =>
                                                        handleHorarioChange(index, 'inicio', e.target.value)
                                                    }
                                                />
                                            </label>
                                            <label>
                                                Fim:
                                                <input
                                                    type="time"
                                                    value={horario.fim}
                                                    onChange={(e) =>
                                                        handleHorarioChange(index, 'fim', e.target.value)
                                                    }
                                                />
                                            </label>
                                        </TimeInputContainer>
                                    )}
                                </DivLabelInput>
                            ))
                        ) : (
                            <p>Carregando horários...</p>
                        )}
                        {error && <StyledError style={{ margin: '0' }}>{error}</StyledError>}
                        {sucess && <StyledSuccess style={{ margin: '0' }}>{sucess}</StyledSuccess>}
                        <SaveButton type="button" onClick={handleSalvar}>
                            Salvar Configurações
                        </SaveButton>
                    </FormularioConfig>
                )}
            </ContainerConfig>
        </React.Fragment>
    );

};

export default ConfigurarEscritorio;
