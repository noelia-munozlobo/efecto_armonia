import React from 'react'
import Especialista from '../components/Especialista'
import Header from '../components/Header';
import Footer from '../components/Footer';
import FormularioAdmin from '../components/FormularioAdmin';

const PagEspecialista = () => {
  return (
    <div>
         <Header />
        <Especialista/>
        <FormularioAdmin/>
        <Footer />
    </div>
  )
}

export default PagEspecialista