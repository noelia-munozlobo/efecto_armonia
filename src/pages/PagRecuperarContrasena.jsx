import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecoveryEmailForm from '../components/RecoveryEmailForm';

const RecuperarContrasena  = () => {
  return (
    <div>
        <Header/>
        <RecoveryEmailForm recoveryCode="123456" toEmail=''/>
        <Footer/>
    </div>
  )
}

export default RecuperarContrasena 