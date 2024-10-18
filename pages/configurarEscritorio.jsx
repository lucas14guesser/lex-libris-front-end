import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import useUserDashboard from '@/components/functions/UserDashboardFunctions';
import { ContainerConfig, DivLabelInput, DivSubTitleArrowHandle, FormularioConfig, SaveButton, TextoLabelConfig, TimeInputContainer } from '@/theme/ConfiguracaoEscritorioStyles';
import { CamposInput, ContainerLabelInput, Formulario, LinkBackToDashboard, StyledError, StyledSuccess, Subtitulo, TextoLabel, Titulo } from '@/theme/GlobalStyles';
import { FaArrowRight, FaArrowLeft, FaRegUser } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

const ConfigurarEscritorio = () => {
    const { telefoneEscritorio } = useUserDashboard();
    const [horarios, setHorarios] = useState([]);
    const [sucess, setSucess] = useState('');
    const [error, setError] = useState('');
    const [horariosTrabalhos, setHorariosTrabalhos] = useState(false);
    const [funcionariosMenu, setFuncionariosMenu] = useState(false);
    const [funcionarios, setFuncionarios] = useState('');
    const [nomeFunc, setNomeFunc] = useState('');
    const [escritorioRel, setEscritorioRel] = useState('');

    const diasDaSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

    const handleClickFuncionariosMenu = () => {
        setFuncionariosMenu(!funcionariosMenu);
    };

    useEffect(() => {
        const fetchDadosFuncionarios = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/lex/funcionario/${telefoneEscritorio}`);
                setFuncionarios(response.data.result);
            } catch (error) {
                console.error('Erro ao buscar dados dos funcionarios.');
            }
        };
        fetchDadosFuncionarios();
    }, [telefoneEscritorio]);

    const carregarHorarios = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/lex/verificar-configuracao/${telefoneEscritorio}`);
            if (response.status === 200 && response.data.result) {
                setHorarios(response.data.result.length > 0 ? response.data.result : Array(7).fill({ ativo: 0, inicio: '', fim: '' }));
            }
        } catch (error) {
            console.error('Erro ao carregar horários:', error);
        }
    };

    const handleHorarioChange = (index, campo, valor) => {
        setHorarios(prevHorarios => {
            const novosHorarios = [...prevHorarios];
            if (novosHorarios[index]) {
                if (campo === 'ativo') {
                    novosHorarios[index] = { ...novosHorarios[index], ativo: valor ? 1 : 0 };
                } else {
                    novosHorarios[index][campo] = valor;
                }
            }
            return novosHorarios;
        });
    };

    const handleCadastrarFuncionario = async (e) => {
        e.preventDefault();
        setSucess('');
        setError('');

        try {
            if (!nomeFunc || !escritorioRel) {
                setError('Todos os campos são obrigatórios.');
                return;
            }

            const response = await axios.post('http://localhost:3001/lex/funcionario', {
                nome_funcionario: nomeFunc,
                escritorio_relac: escritorioRel
            });

            if (response.status === 201) {
                setNomeFunc('');
                setEscritorioRel('');
            } else {
                setError('Erro ao cadastrar o funcionário');
            }
        } catch (error) {
            setError('Erro ao cadastrar funcionário', error);
        }
    };

    const handleSalvar = async () => {
        setSucess('');
        setError('');
        if (!telefoneEscritorio) {
            setError('O número de telefone do escritório não está disponível.');
            return;
        }
    
        try {
            const horariosComDias = horarios.map((horario, index) => ({
                dia: diasDaSemana[index],
                inicio: horario.inicio,
                fim: horario.fim,
                ativo: horario.ativo,
            }));
    
            const response = await axios.post(`http://localhost:3001/lex/configurar-escritorio/${telefoneEscritorio}/horarios`, {
                horarios: horariosComDias,
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
        setHorariosTrabalhos(!horariosTrabalhos);
    };

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
                <DivSubTitleArrowHandle style={{ width: '17rem' }}>
                    <Subtitulo onClick={handleClickFuncionariosMenu} style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>Configurar advogados <FaArrowRight style={{ fontSize: '1.1rem' }} /></Subtitulo>
                    {funcionariosMenu && (
                        <Formulario style={{ alignItems: 'flex-start', padding: '0', gap: '1rem' }}>
                            <ContainerLabelInput>
                                <TextoLabel htmlFor='nome_func'>
                                    <FaRegUser />
                                </TextoLabel>
                                <CamposInput
                                    type='text'
                                    name='nome_func'
                                    placeholder='Nome do Advogado'
                                    value={nomeFunc}
                                    onChange={(e) => setNomeFunc(e.target.value)}
                                />
                            </ContainerLabelInput>
                            <ContainerLabelInput>
                                <TextoLabel htmlFor='escritorio_rel'>
                                    <FiPhone />
                                </TextoLabel>
                                <CamposInput
                                    type='text'
                                    name='escritorio_rel'
                                    value={telefoneEscritorio}
                                    disabled
                                />
                            </ContainerLabelInput>
                            <SaveButton type="button" onClick={handleCadastrarFuncionario}>
                                Cadastrar Funcionário
                            </SaveButton>
                            {error && <StyledError style={{ margin: '0' }}>{error}</StyledError>}
                        </Formulario>
                    )}
                </DivSubTitleArrowHandle>
                <DivSubTitleArrowHandle>
                    <Subtitulo onClick={handleClickHorariosTrabalho} style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>Horários de trabalho <FaArrowRight style={{ fontSize: '1.1rem' }} /></Subtitulo>
                    {horariosTrabalhos && (
                        <FormularioConfig onSubmit={(e) => e.preventDefault()}>
                            {diasDaSemana.map((dia, index) => (
                                <DivLabelInput key={index}>
                                    <TextoLabelConfig>
                                        <p>{dia}:</p>
                                        <input
                                            type="checkbox"
                                            checked={horarios[index]?.ativo === 1}
                                            onChange={(e) => handleHorarioChange(index, 'ativo', e.target.checked)}
                                        />
                                        <p>Ativar horário</p>
                                    </TextoLabelConfig>
                                    {horarios[index]?.ativo === 1 && (
                                        <TimeInputContainer>
                                            <label>
                                                Início:
                                                <input
                                                    type="time"
                                                    value={horarios[index]?.inicio || ''}
                                                    onChange={(e) => handleHorarioChange(index, 'inicio', e.target.value)}
                                                />
                                            </label>
                                            <label>
                                                Fim:
                                                <input
                                                    type="time"
                                                    value={horarios[index]?.fim || ''}
                                                    onChange={(e) => handleHorarioChange(index, 'fim', e.target.value)}
                                                />
                                            </label>
                                        </TimeInputContainer>
                                    )}
                                </DivLabelInput>
                            ))}
                            {error && <StyledError style={{ margin: '0' }}>{error}</StyledError>}
                            {sucess && <StyledSuccess style={{ margin: '0' }}>{sucess}</StyledSuccess>}
                            <SaveButton type="button" onClick={handleSalvar}>
                                Salvar Configurações
                            </SaveButton>
                        </FormularioConfig>
                    )}
                </DivSubTitleArrowHandle>
            </ContainerConfig>
        </React.Fragment>
    );
};

export default ConfigurarEscritorio;
