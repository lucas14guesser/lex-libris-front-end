import { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import useUserDashboard from '@/components/functions/UserDashboardFunctions';

const ConfigurarEscritorio = () => {
    const { telefoneEscritorio } = useUserDashboard();
    const [horarios, setHorarios] = useState([
        { dia: 'Segunda', inicio: '', fim: '', ativo: false },
        { dia: 'Terça', inicio: '', fim: '', ativo: false },
        { dia: 'Quarta', inicio: '', fim: '', ativo: false },
        { dia: 'Quinta', inicio: '', fim: '', ativo: false },
        { dia: 'Sexta', inicio: '', fim: '', ativo: false },
        { dia: 'Sábado', inicio: '', fim: '', ativo: false },
        { dia: 'Domingo', inicio: '', fim: '', ativo: false },
    ]);
    const [mensagem, setMensagem] = useState('');

    const handleHorarioChange = (index, campo, valor) => {
        setHorarios(prevHorarios => {
            const novosHorarios = [...prevHorarios];
            novosHorarios[index][campo] = valor;
            return novosHorarios;
        });
    };

    const handleSalvar = async () => {
        setMensagem('');
        if (!telefoneEscritorio) {
            setMensagem('O número de telefone do escritório não está disponível.');
            return;
        }

        const horariosParaSalvar = horarios.map(h => ({
            dia: h.dia,
            inicio: h.inicio,
            fim: h.fim,
            ativo: h.ativo
        }));

        try {
            const response = await axios.post(`http://localhost:3001/lex/configurar-escritorio/${telefoneEscritorio}/horarios`, {
                horarios: horariosParaSalvar,
            });

            if (response.status === 200) {
                setMensagem('Configurações salvas com sucesso!');
                carregarHorarios();
            }
        } catch (error) {
            console.error('Erro ao salvar configurações:', error);
            setMensagem('Erro ao salvar configurações. Tente novamente.');
        }
    };

    const carregarHorarios = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/lex/configurar-escritorio/${telefoneEscritorio}/horarios`);
            if (response.status === 200 && response.data.horarios) {
                setHorarios(response.data.horarios);
            }
        } catch (error) {
            console.error('Erro ao carregar horários:', error);
        }
    };

    useEffect(() => {
        if (telefoneEscritorio) {
            carregarHorarios();
        }
    }, [telefoneEscritorio]);

    return (
        <div>
            <Head>
                <title>Lex Libris - Configurar Escritório</title>
            </Head>
            <h1>Configurações do Escritório</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                {horarios.length > 0 ? (
                    horarios.map((horario, index) => (
                        <div key={index} className="horario-config">
                            <label>
                                {horario.dia}:
                                <input
                                    type="checkbox"
                                    checked={horario.ativo}
                                    onChange={(e) =>
                                        handleHorarioChange(index, 'ativo', e.target.checked)
                                    }
                                />
                                Ativo
                            </label>
                            {horario.ativo && (
                                <div className="horario-inputs">
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
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Carregando horários...</p>
                )}
                {mensagem && <p>{mensagem}</p>}
                <button type="button" onClick={handleSalvar}>
                    Salvar Configurações
                </button>
            </form>
        </div>
    );
};

export default ConfigurarEscritorio;
