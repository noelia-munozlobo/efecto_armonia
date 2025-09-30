import React from 'react'
import FormularioAdmin from '../components/FormularioAdmin'
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListaSuscritos from '../components/AdminSuscritos';
import AdminRecursos from '../components/AdminRecursos';

const PagAdmin = () => {
  return (
    <div>
        <Header/>
        <ListaSuscritos/>
        <FormularioAdmin/>
        <AdminRecursos/>
        <Footer/>
    </div>
  )
}

export default PagAdmin