import { Subtitulo, Titulo } from '@/theme/GlobalStyles';
import { ApresentacaoPP, ContactInfo, ContainerPP, ItemListaPP, ListaPP, ParagrafoPP } from '@/theme/PoliticaPrivacidadeStyles';
import Head from 'next/head';

export default function PoliticaPrivacidade() {
    return (
        <>
            <Head>
                <title>Lex Libris - Política de Privacidade</title>
            </Head>
            <ContainerPP>
                <ApresentacaoPP>
                    <Titulo style={{ marginBottom: '1rem' }}>Política de Privacidade</Titulo>
                    <ParagrafoPP>
                        A sua privacidade é importante para nós. Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais no uso de nossa plataforma de automação de processos advocatícios via WhatsApp.
                    </ParagrafoPP>
                </ApresentacaoPP>
                <Subtitulo style={{ marginBottom: '1rem' }}>1. Informações que Coletamos</Subtitulo>
                <ParagrafoPP>Coletamos informações pessoais fornecidas diretamente por você, como:</ParagrafoPP>
                <ListaPP>
                    <ItemListaPP>Nome completo;</ItemListaPP>
                    <ItemListaPP>CPF;</ItemListaPP>
                    <ItemListaPP>Dados de contato (telefone, e-mail);</ItemListaPP>
                    <ItemListaPP>Informações relacionadas aos processos advocatícios.</ItemListaPP>
                </ListaPP>

                <Subtitulo style={{ marginBottom: '1rem' }}>2. Como Usamos Suas Informações</Subtitulo>
                <ParagrafoPP>As informações coletadas são usadas para:</ParagrafoPP>
                <ListaPP>
                    <ItemListaPP>Gerenciar processos advocatícios;</ItemListaPP>
                    <ItemListaPP>Agendar consultas e diligências;</ItemListaPP>
                    <ItemListaPP>Comunicação via WhatsApp para fornecer atualizações e suporte sobre processos;</ItemListaPP>
                    <ItemListaPP>Cumprir obrigações legais e regulatórias.</ItemListaPP>
                </ListaPP>

                <Subtitulo style={{ marginBottom: '1rem' }}>3. Compartilhamento de Informações</Subtitulo>
                <ParagrafoPP>
                    Não compartilhamos suas informações pessoais com terceiros, exceto em casos necessários para o cumprimento de uma obrigação legal ou judicial, ou quando você autorizar expressamente.
                </ParagrafoPP>

                <Subtitulo style={{ marginBottom: '1rem' }}>4. Segurança das Informações</Subtitulo>
                <ParagrafoPP>
                    Implementamos medidas de segurança para proteger suas informações contra acessos não autorizados, uso indevido ou divulgação.
                </ParagrafoPP>

                <Subtitulo style={{ marginBottom: '1rem' }}>5. Seus Direitos</Subtitulo>
                <ParagrafoPP>
                    Você tem o direito de acessar, corrigir ou solicitar a exclusão de suas informações pessoais armazenadas em nossa plataforma. Para exercer seus direitos, entre em contato conosco pelo nosso canal de suporte.
                </ParagrafoPP>

                <Subtitulo style={{ marginBottom: '1rem' }}>6. Alterações a Esta Política</Subtitulo>
                <ParagrafoPP>
                    Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos que você revise esta página regularmente para estar ciente de quaisquer mudanças.
                </ParagrafoPP>

                <Subtitulo style={{ marginBottom: '1rem' }}>7. Contato</Subtitulo>
                <ParagrafoPP>Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade, entre em contato conosco:</ParagrafoPP>
                <ContactInfo>
                    <ItemListaPP>E-mail: contato@lexlibris.com</ItemListaPP>
                    <ItemListaPP>WhatsApp: +55 DDD 999999999</ItemListaPP>
                </ContactInfo>
            </ContainerPP>
        </>
    );
}
