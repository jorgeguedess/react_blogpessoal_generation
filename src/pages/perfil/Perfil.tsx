import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { Container } from "../../components/container/Container";

function Perfil() {
  const navigate = useNavigate();

  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/login");
    }
  }, [usuario.token]);

  return (
    <Container>
      <div className="container m-4 mx-auto overflow-hidden rounded-2xl">
        <img
          className="h-72 w-full border-b-8 border-white object-cover"
          src="https://i.imgur.com/ZZFAmzo.jpg"
          alt="Capa do Perfil"
        />

        <img
          className="relative z-10 mx-auto mt-[-8rem] w-56 rounded-full border-8 border-white"
          src={usuario.foto}
          alt={`Foto de perfil de ${usuario.nome}`}
        />

        <div
          className="relative mt-[-6rem] flex h-72 flex-col 
                    items-center justify-center bg-sky-500 text-2xl text-white"
        >
          <p>Nome: {usuario.nome} </p>
          <p>Email: {usuario.usuario}</p>
        </div>
      </div>
    </Container>
  );
}

export default Perfil;
