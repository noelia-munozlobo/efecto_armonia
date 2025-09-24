import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from '../pages/Inicio';
import PagRegistro from '../pages/PagRegistro';
import PagSesion from '../pages/PagSesion';
import PagContacto from '../pages/PagContacto';
import PagRecursos from '../pages/PagRecursos';
import PagAdmin from '../pages/PagAdmin';

const Routing = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/registro" element={<PagRegistro />} />
      <Route path="/sesion" element={<PagSesion />} />
      <Route path="/contacto" element={<PagContacto />} />
      <Route path="/recursos" element={<PagRecursos />} />
      <Route path="/PagAdmin" element={<PagAdmin />} />
    </Routes>
  </Router>
);

export default Routing;

