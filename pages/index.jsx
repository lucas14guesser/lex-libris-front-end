import React from 'react';
import {
    HeroSection,
    HeroButton,
    FuncionalidadesSection,
    FuncionalidadeCard,
    FuncionalidadeTitle,
    FuncionalidadeDescription,
    BeneficiosSection,
    BeneficioItem,
    CTASection,
    CTATitle,
    CTAText,
    CTAButton,
    HeroSectionBtn,
} from '../src/theme/HomePageStyles';
import { Subtitulo, Titulo } from '@/theme/GlobalStyles';

const HomePage = () => {
    return (
        <div>
            <HeroSection>
                <Titulo style={{ marginBottom: '1rem' }}>Automatize seu Escritório de Advocacia com Facilidade</Titulo>
                <Subtitulo style={{ marginBottom: '1rem' }}>
                    Gerencie clientes e processos diretamente pelo WhatsApp e controle todas as informações através do nosso painel online.
                </Subtitulo>
                <HeroSectionBtn>
                    <HeroButton href='/servicos'>Saiba Mais</HeroButton>
                    <HeroButton href='/planos'>Conheça nossos planos</HeroButton>
                </HeroSectionBtn>
            </HeroSection>

            <FuncionalidadesSection>
                <FuncionalidadeCard>
                    <FuncionalidadeTitle>Automação de Cadastro de Clientes</FuncionalidadeTitle>
                    <FuncionalidadeDescription>
                        Seus clientes poderão ter a facilidade de se cadastrar no seu escritório via WhatsApp
                    </FuncionalidadeDescription>
                </FuncionalidadeCard>
                <FuncionalidadeCard>
                    <FuncionalidadeTitle>Início de Processos Judiciais</FuncionalidadeTitle>
                    <FuncionalidadeDescription>
                        Abertura de processos de forma prática com comunicação direta pelo WhatsApp.
                    </FuncionalidadeDescription>
                </FuncionalidadeCard>
                <FuncionalidadeCard>
                    <FuncionalidadeTitle>Controle Completo pelo Painel</FuncionalidadeTitle>
                    <FuncionalidadeDescription>
                        Visualize, edite e acompanhe processos e atendimentos por uma interface intuitiva e segura.
                    </FuncionalidadeDescription>
                </FuncionalidadeCard>
            </FuncionalidadesSection>

            <BeneficiosSection>
                <h2>Por que Escolher Nosso Sistema?</h2>
                <BeneficioItem>Automação Inteligente</BeneficioItem>
                <BeneficioItem>Facilidade de Uso</BeneficioItem>
                <BeneficioItem>Segurança de Dados</BeneficioItem>
                <BeneficioItem>Aumento de Produtividade</BeneficioItem>
            </BeneficiosSection>

            <CTASection>
                <CTATitle>Pronto para Modernizar seu Escritório?</CTATitle>
                <CTAText>
                    Verifique nossos planos e veja como nosso sistema pode transformar a gestão do seu escritório.
                </CTAText>
                <HeroSectionBtn>
                    <CTAButton href='/planos'>Começar Agora</CTAButton>
                </HeroSectionBtn>
            </CTASection>
        </div>
    );
};

export default HomePage;
