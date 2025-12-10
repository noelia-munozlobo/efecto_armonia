import React from 'react'
import Especialista from '../components/Especialista'
import Header from '../components/Header';
import Footer from '../components/Footer';
import FormularioAdmin from '../components/FormularioAdmin';
import VerHorario from '../components/VerHorario';
import MentoriasEspecialista from '../components/MentoriasEspecialista';
import ChatEspecialista from '../components/ChatEspecialista';

const PagEspecialista = () => {
  return (
    <div>
        <Header />
        <Especialista/>
        <VerHorario/>
        <MentoriasEspecialista/>
        <FormularioAdmin/>
        <ChatEspecialista/>
        <Footer />
    </div>
  )
}

export default PagEspecialista