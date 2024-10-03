import { ContainerFooter } from '@/theme/FooterStyles';
import React from 'react'

function Footer() {

  let anoAtual = new Date().getFullYear();

  return (
    <ContainerFooter style={{marginTop: '10rem'}}>
      <p>&copy; Todos os direitos reservados {anoAtual}</p>
    </ContainerFooter>
  )
}

export default Footer