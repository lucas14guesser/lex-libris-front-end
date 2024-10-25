import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import useUserDashboard from '@/components/functions/UserDashboardFunctions';
import { ContainerConfig, ContainerFormularioConfig, DivLabelInput, DivSubTitleArrowHandle, FormularioConfig, SaveButton, TextoLabelConfig, TimeInputContainer } from '@/theme/ConfiguracaoEscritorioStyles';
import { CamposInput, ContainerFormulario, ContainerLabelInput, Formulario, LinkBackToDashboard, StyledError, StyledSuccess, Subtitulo, TextoLabel, Titulo } from '@/theme/GlobalStyles';
import { FaArrowRight, FaArrowLeft, FaRegUser, FaSearch } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { BtnBuscaProcesso, ContainerInputBtnBuscaProcesso, InputBuscaProcesso, ListaClientes } from '@/theme/UserDashboardTheme';

const ConfigurarEscritorio = () => {
    const [funcionariosMenu, setFuncionariosMenu] = useState(false);
    const [funcionarios, setFuncionarios] = useState('');
    const [funcionariosFiltrados, setFuncionariosFiltrados] = useState(funcionarios);
    const [busca, setBusca] = useState('');

    const [horarios, setHorarios] = useState([]);
    const [horariosTrabalhos, setHorariosTrabalhos] = useState(false);

    const [nomeFunc, setNomeFunc] = useState('');
    const { telefoneEscritorio } = useUserDashboard();
    const [escritorioRel, setEscritorioRel] = useState('');
    const [sucess, setSucess] = useState('');
    const [error, setError] = useState('');

    const [idFuncionarioEdit, setIdFuncionarioEdit] = useState('');
    const [nomeFuncEdit, setNomeFuncEdit] = useState('');
    const [sucessEdit, setSucessEdit] = useState('');
    const [errorEdit, setErrorEdit] = useState('');

    const [idFuncionarioRemove, setIdFuncionarioRemove] = useState('');
    const [sucessRemove, setSucessRemove] = useState('');
    const [errorRemove, setErrorRemove] = useState('');

    const buscarFuncionarios = () => {
        if (busca.trim() === '') {
            setFuncionariosFiltrados(funcionarios);
        } else {
            const results = funcionarios.filter(funcionario =>
                funcionario.nome_funcionario.toLowerCase().includes(busca.toLowerCase())
            );
            setFuncionariosFiltrados(results);
        }
    };

    useEffect(() => {
        setFuncionariosFiltrados(funcionarios);
    }, [funcionarios]);

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

        setError('');
        setSucess('');

        try {
            if (!nomeFunc || !telefoneEscritorio) {
                setError('Todos os campos são obrigatórios.');
                return;
            }

            const response = await axios.post('http://localhost:3001/lex/funcionario', {
                nome_funcionario: nomeFunc,
                escritorio_relac: telefoneEscritorio
            });

            if (response.status === 201) {
                setSucess('Advogado cadastrado com sucesso.');
                setNomeFunc('');
                setEscritorioRel('');
            } else {
                setError('Erro ao cadastrar o advogado');
            }
        } catch (error) {
            setError('Erro ao cadastrar advogado');
        }
    };

    const handleEditarFuncionario = async (e) => {
        e.preventDefault();

        setErrorEdit('');
        setSucessEdit('');

        try {
            if (idFuncionarioEdit && nomeFuncEdit) {
                const response = await axios.put(`http://localhost:3001/lex/funcionario/${idFuncionarioEdit}`, {
                    nome_funcionario: nomeFuncEdit
                });

                if (response.data.error) {
                    setErrorEdit(response.data.error);
                    setSucessEdit('');
                } else {
                    setSucessEdit('Advogado editado com sucesso!');
                    setErrorEdit('');
                    setNomeFuncEdit('');
                    setIdFuncionarioEdit('');
                }
            } else {
                setErrorEdit('Por favor, preencha todos os campos.');
                setSucessEdit('');
            }
        } catch (error) {
            setErrorEdit('Erro ao editar o advogado.');
            setSucessEdit('');
        }
    };


    const handleRemoverFuncionario = async (e) => {
        e.preventDefault();

        setErrorRemove('');
        setSucessRemove('');

        try {
            if (idFuncionarioRemove) {
                const response = await axios.delete(`http://localhost:3001/lex/funcionario/${idFuncionarioRemove}`);

                if (response.data.error) {
                    setErrorRemove(response.data.error);
                    setSucessRemove('');
                } else {
                    setSucessRemove('Advogado removido com sucesso!');
                    setErrorRemove('');
                    setIdFuncionarioRemove('');
                }
            } else {
                setErrorRemove('Por favor, forneça um ID válido.');
                setSucessRemove('');
            }
        } catch (error) {
            setErrorRemove('Erro ao remover o advogado.');
            setSucessRemove('');
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
            <LinkBackToDashboard href='/userDashboard' style={{marginTop: '7rem'}}>
                <FaArrowLeft />
                Voltar ao Painel do usuário
            </LinkBackToDashboard>
            <ContainerConfig>
                <Head>
                    <title>Lex Libris - Configurar Escritório</title>
                </Head>
                <Titulo style={{ marginBottom: '1rem' }}>Configurações do Escritório</Titulo>
                <DivSubTitleArrowHandle>
                    <Subtitulo onClick={handleClickFuncionariosMenu} style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>Configurar advogados <FaArrowRight style={{ fontSize: '1.1rem' }} /></Subtitulo>
                    {funcionariosMenu && (
                        <ContainerFormularioConfig>
                            <ContainerFormulario style={{ width: '20rem', border: '1px solid #000D20', borderRadius: '8px' }}>
                                <Formulario style={{ padding: '2rem', gap: '1rem' }} onSubmit={handleCadastrarFuncionario}>
                                    <TextoLabel>Cadastro de Advogado</TextoLabel>
                                    <ContainerLabelInput>
                                        <TextoLabel htmlFor='nome_func'>
                                            <FaRegUser />
                                        </TextoLabel>
                                        <CamposInput
                                            type='text'
                                            name='nome_func'
                                            id='nome_func'
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
                                            readOnly
                                        />
                                    </ContainerLabelInput>
                                    {sucess && <StyledSuccess style={{ margin: '0' }}>{sucess}</StyledSuccess>}
                                    {error && <StyledError style={{ margin: '0' }}>{error}</StyledError>}
                                    <SaveButton type="submit" style={{ width: '13rem' }}>
                                        Cadastrar Advogado
                                    </SaveButton>
                                </Formulario>
                            </ContainerFormulario>

                            <ContainerFormulario style={{ width: '20rem', border: '1px solid #000D20', borderRadius: '8px' }}>
                                <Formulario style={{ padding: '2rem', gap: '1rem' }} onSubmit={handleEditarFuncionario}>
                                    <TextoLabel>Editar Dados do Advogado</TextoLabel>
                                    <ContainerLabelInput>
                                        <TextoLabel htmlFor='id_func_edit'>
                                            <FaRegUser />
                                        </TextoLabel>
                                        <CamposInput
                                            type='text'
                                            name='id_func_edit'
                                            id='id_func_edit'
                                            placeholder='ID do Advogado'
                                            value={idFuncionarioEdit}
                                            onChange={(e) => setIdFuncionarioEdit(e.target.value)}
                                        />
                                    </ContainerLabelInput>
                                    <ContainerLabelInput>
                                        <TextoLabel htmlFor='nome_func_edit'>
                                            <FaRegUser />
                                        </TextoLabel>
                                        <CamposInput
                                            type='text'
                                            name='nome_func_edit'
                                            id='nome_func_edit'
                                            placeholder='Nome do Advogado'
                                            value={nomeFuncEdit}
                                            onChange={(e) => setNomeFuncEdit(e.target.value)}
                                        />
                                    </ContainerLabelInput>
                                    {sucessEdit && <StyledSuccess style={{ margin: '0' }}>{sucessEdit}</StyledSuccess>}
                                    {errorEdit && <StyledError style={{ margin: '0' }}>{errorEdit}</StyledError>}
                                    <SaveButton type="submit" style={{ width: '13rem' }}>
                                        Editar Advogado
                                    </SaveButton>
                                </Formulario>
                            </ContainerFormulario>

                            <ContainerFormulario style={{ width: '20rem', border: '1px solid #000D20', borderRadius: '8px' }}>
                                <Formulario style={{ padding: '2rem', gap: '1rem' }} onSubmit={handleRemoverFuncionario}>
                                    <TextoLabel>Remover Advogado</TextoLabel>
                                    <ContainerLabelInput>
                                        <TextoLabel htmlFor='id_func'>
                                            <FaRegUser />
                                        </TextoLabel>
                                        <CamposInput
                                            type='text'
                                            name='id_func'
                                            id='id_func'
                                            placeholder='ID do Advogado'
                                            value={idFuncionarioRemove}
                                            onChange={(e) => setIdFuncionarioRemove(e.target.value)}
                                        />
                                    </ContainerLabelInput>
                                    {sucessRemove && <StyledSuccess style={{ margin: '0' }}>{sucessRemove}</StyledSuccess>}
                                    {errorRemove && <StyledError style={{ margin: '0' }}>{errorRemove}</StyledError>}
                                    <SaveButton type="submit" style={{ width: '13rem' }}>
                                        Remover Advogado
                                    </SaveButton>
                                </Formulario>
                            </ContainerFormulario>
                        </ContainerFormularioConfig>


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
                <Subtitulo style={{marginBottom: '.5rem'}}>Lista de Advogados</Subtitulo>
                <ContainerInputBtnBuscaProcesso  style={{marginTop: '1rem'}}>
                        <InputBuscaProcesso
                            type="text"
                            name="buscaFuncionario"
                            id="buscaFuncionario"
                            placeholder="Nome do advogado que deseja buscar..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                        <BtnBuscaProcesso onClick={buscarFuncionarios}>
                            <FaSearch />
                        </BtnBuscaProcesso>
                    </ContainerInputBtnBuscaProcesso>
                <ListaClientes>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(funcionariosFiltrados) && funcionariosFiltrados.map(funcionario => (
                                <tr key={funcionario.id_funcionario}>
                                    <td>{funcionario.id_funcionario}</td>
                                    <td>{funcionario.nome_funcionario}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ListaClientes>
            </ContainerConfig>
        </React.Fragment>
    );
};

export default ConfigurarEscritorio;
