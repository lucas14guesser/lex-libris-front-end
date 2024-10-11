import { ApresentacaoCA, ContainerCA, ContainerPerguntasRespostas, FAQItem, ParagrafoCA, PerguntasCA, RespostasCA } from '@/theme/CentralAjudaStyles';
import { Subtitulo, Titulo } from '@/theme/GlobalStyles';
import Head from 'next/head';

export default function CentralDeAjuda() {
    return (
        <>
            <Head>
                <title>Lex Libris - Central de Ajuda</title>
            </Head>
            <ContainerCA>
                <ApresentacaoCA>
                    <Titulo style={{marginBottom: '1rem'}}>Central de Ajuda</Titulo>
                    <ParagrafoCA>
                        Bem-vindo à nossa Central de Ajuda. Aqui você encontrará respostas para as perguntas mais frequentes sobre o uso do nosso sistema de automação de processos advocatícios via WhatsApp.
                    </ParagrafoCA>
                </ApresentacaoCA>

                <ContainerPerguntasRespostas>
                    <Subtitulo style={{marginBottom: '1rem'}}>1. Como posso agendar um atendimento?</Subtitulo>
                    <FAQItem>
                        <PerguntasCA>Como faço para agendar um atendimento pelo WhatsApp?</PerguntasCA>
                        <RespostasCA>Para agendar um atendimento, basta enviar uma mensagem com a opção "2 - Agendar um atendimento" e seguir as instruções para escolher uma data e horário disponíveis.</RespostasCA>
                    </FAQItem>
                </ContainerPerguntasRespostas>

                <ContainerPerguntasRespostas>
                    <Subtitulo style={{marginBottom: '1rem'}}>2. Informações sobre processos</Subtitulo>
                    <FAQItem>
                        <PerguntasCA>Como acompanho o andamento do meu processo?</PerguntasCA>
                        <RespostasCA>Para acompanhar o andamento do seu processo, envie a mensagem "1 - Iniciar um processo" e forneça o identificador do seu processo. O sistema irá buscar as informações e atualizações do seu processo.</RespostasCA>
                    </FAQItem>
                    <FAQItem>
                        <PerguntasCA>Posso consultar mais de um processo ao mesmo tempo?</PerguntasCA>
                        <RespostasCA>Sim, você pode consultar múltiplos processos associados ao seu CPF. O sistema irá listar todos os processos em andamento para você escolher qual deseja visualizar.</RespostasCA>
                    </FAQItem>
                </ContainerPerguntasRespostas>

                <ContainerPerguntasRespostas>
                    <Subtitulo style={{marginBottom: '1rem'}}>3. Segurança e privacidade</Subtitulo>
                    <FAQItem>
                        <PerguntasCA>Minhas informações estão seguras?</PerguntasCA>
                        <RespostasCA>Sim, implementamos medidas de segurança avançadas para proteger todas as suas informações pessoais e os dados relacionados aos seus processos jurídicos.</RespostasCA>
                    </FAQItem>
                    <FAQItem>
                        <PerguntasCA>Posso solicitar a exclusão dos meus dados?</PerguntasCA>
                        <RespostasCA>Sim, você pode solicitar a exclusão dos seus dados a qualquer momento, enviando uma solicitação através do nosso canal de suporte ou WhatsApp.</RespostasCA>
                    </FAQItem>
                </ContainerPerguntasRespostas>
            </ContainerCA>
        </>
    );
}
