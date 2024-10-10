import React from 'react';
import Head from 'next/head';
import { ApresentacaoServicos, ContainerServicos, ConteudoServicos } from '@/theme/ServicosStyles';

const Servicos = () => {
    return (
        <>
            <Head>
                <title>Lex Libris - Serviços</title>
            </Head>
            <ContainerServicos>
                <ApresentacaoServicos>
                    <h1>Nossos Serviços</h1>
                    <p>Automatize seus processos jurídicos com nossa solução de chatbot via WhatsApp.</p>
                </ApresentacaoServicos>

                <ConteudoServicos>
                    <h2>Automação de Processos Judiciais via WhatsApp</h2>
                    <p>
                        Oferecemos uma plataforma completa para automação de processos jurídicos, permitindo que seus clientes iniciem processos, verifiquem documentos e
                        gerenciem consultas através de um chatbot no WhatsApp.
                    </p>
                </ConteudoServicos>

                <ConteudoServicos>
                    <h2>Agendamentos Automatizados</h2>
                    <p>
                        Com o nosso sistema, seus clientes podem agendar consultas diretamente via WhatsApp, com confirmação instantânea e gestão de horários para evitar
                        conflitos.
                    </p>
                </ConteudoServicos>

                <ConteudoServicos>
                    <h2>Notificações e Lembretes</h2>
                    <p>
                        O chatbot envia notificações automáticas sobre o andamento dos processos, além de lembretes de prazos importantes como audiências ou entrega de
                        documentos.
                    </p>
                </ConteudoServicos>

                <ConteudoServicos>
                    <h2>Atendimento Personalizado e Interativo</h2>
                    <p>
                        Os clientes podem acessar um menu interativo para iniciar processos, agendar atendimentos, verificar o status dos processos e realizar pagamentos, tudo
                        diretamente via WhatsApp.
                    </p>
                </ConteudoServicos>

                <ConteudoServicos>
                    <h2>Integração com o Sistema Lex Libris</h2>
                    <p>
                        Nosso software se integra diretamente com o sistema do Lex Libris, permitindo que os advogados tenham controle total sobre os processos de seus clientes.
                        Os advogados podem editar, atualizar e gerenciar todos os processos de forma prática e centralizada, sem a necessidade de acessar sistemas externos.
                    </p>
                </ConteudoServicos>

                <ConteudoServicos>
                    <h2>Pagamentos e Faturamento</h2>
                    <p>
                        Oferecemos a possibilidade de realizar pagamentos de honorários e taxas diretamente pelo WhatsApp, com emissão automática de recibos e faturas.
                    </p>
                </ConteudoServicos>

                <ConteudoServicos>
                    <h2>Segurança e Conformidade Legal</h2>
                    <p>
                        Garantimos a segurança dos dados dos clientes com criptografia e verificações de identidade, seguindo as normas de proteção de dados como a LGPD.
                    </p>
                </ConteudoServicos>
            </ContainerServicos>
        </>
    );
};

export default Servicos;
