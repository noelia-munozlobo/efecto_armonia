import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from '../pages/Inicio';
import PagRegistro from '../pages/PagRegistro';
import PagSesion from '../pages/PagSesion';
import PagContacto from '../pages/PagContacto';

const Routing = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/registro" element={<PagRegistro />} />
      <Route path="/sesion" element={<PagSesion />} />
      <Route path="/contacto" element={<PagContacto />} />
    </Routes>
  </Router>
);

export default Routing;

