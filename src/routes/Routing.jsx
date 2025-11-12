import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from '../pages/Inicio';
import PagRegistro from '../pages/PagRegistro';
import PagSesion from '../pages/PagSesion';
import PagContacto from '../pages/PagContacto';
import PagRecursos from '../pages/PagRecursos';
import PagAdmin from '../pages/PagAdmin';
import PagCliente from '../pages/PagCliente';
import PagEspecialista from '../pages/PagEspecialista';
import PagPsicologos from '../pages/PagPsicologos';


const Routing = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/registro" element={<PagRegistro />} />
      <Route path="/sesion" element={<PagSesion />} />
      <Route path="/contacto" element={<PagContacto />} />
      <Route path="/recursos" element={<PagRecursos />} />
      <Route path="/PagAdmin" element={<PagAdmin />} />
      <Route path="/PagCliente" element={<PagCliente/>} />
      <Route path="/PagEspecialista" element={<PagEspecialista/>} />
      <Route path="/PagPsicologos" element={<PagPsicologos/>} />
      
    </Routes>
  </Router>
);

export default Routing;

