import React from 'react'
import FormularioAdmin from '../components/FormularioAdmin'
import FormularioPsicologo from '../components/FormularioPsicologo'
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminRecursos from '../components/AdminRecursos';
import AdminEspecialistas from '../components/AdminEspecialistas';

const PagAdmin = () => {
  return (
    <div>
        <Header/>
        <FormularioPsicologo/>
        <FormularioAdmin/>
        <AdminEspecialistas/>
        <AdminRecursos/>
        <Footer/>
    </div>
  )
}

export default PagAdmin