import React from 'react';
import { ContainerFooter, ContainerInfoFooter, LinksAcessoFooter, ListaFooter, TxtFooter } from '@/theme/FooterStyles';
import { Titulo } from '@/theme/GlobalStyles';

function Footer() {
  let anoAtual = new Date().getFullYear();

  return (
    <ContainerFooter>
      <ContainerInfoFooter style={{ width: '30%'}}>
        <Titulo style={{ color: '#FFFFFF', marginTop: '0' }}>Sobre nós</Titulo>
        <TxtFooter>
          Aqui na Lex Libris, nossa missão é simplificar a rotina de escritórios de advocacia através de soluções inovadoras em automação com chatbots no WhatsApp. Facilitamos a comunicação com clientes, o agendamento de compromissos e a gestão de processos, tudo de forma eficiente e integrada. Com foco em tecnologia e otimização de tempo, proporcionamos uma experiência prática, garantindo que os advogados possam se concentrar no que realmente importa: seus casos e clientes.
        </TxtFooter>
      </ContainerInfoFooter>
      <ContainerInfoFooter>
        <Titulo style={{ color: '#FFFFFF', marginTop: '0' }}>Mapa do site</Titulo>
        <ListaFooter>
          <li>
            <LinksAcessoFooter href='/login'>Login</LinksAcessoFooter>
          </li>
          <li>
            <LinksAcessoFooter href='/cadastro'>Cadastre-se</LinksAcessoFooter>
          </li>
          <li>
            <LinksAcessoFooter href='/servicos'>Serviços</LinksAcessoFooter>
          </li>
          <li>
            <LinksAcessoFooter href='/planos'>Planos</LinksAcessoFooter>
          </li>
          <li>
            <LinksAcessoFooter href='/contato'>Contate-nos</LinksAcessoFooter>
          </li>
        </ListaFooter>
      </ContainerInfoFooter>
      <ContainerInfoFooter>
        <Titulo style={{ color: '#FFFFFF', marginTop: '0' }}>Política de privacidade</Titulo>
        <ListaFooter>
          <li>
            <LinksAcessoFooter href='/politicaPrivacidade'>Política de privacidade</LinksAcessoFooter>
          </li>
          <li>
            <LinksAcessoFooter href='/centralAjuda'>Central de ajuda</LinksAcessoFooter>
          </li>
        </ListaFooter>
      </ContainerInfoFooter>
      <ContainerInfoFooter style={{width: '100%', margin:'10rem 0 0 0', alignItems: 'center'}}>
        <p>&copy; Lex Libris - Todos os direitos reservados {anoAtual}</p>
      </ContainerInfoFooter>
    </ContainerFooter>
  )
}

export default Footer