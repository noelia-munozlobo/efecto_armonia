import { useParams } from "react-router-dom";
import ComentariosRecursos from "../components/ComentariosRecursos";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoRecursos from "../components/InfoRecursos";


const RecursosVista = () => {
  const { id } = useParams();

  return (
    <div>
      <Header />
      <InfoRecursos id={id} />
      <ComentariosRecursos recursoId={id} />
      <Footer />
    </div>
  );
};

export default RecursosVista;
