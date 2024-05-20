import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/login");
    }
  }, [token]);

  return (
    <main className="flex flex-1 justify-center bg-indigo-900 px-2 py-12 text-white md:py-16">
      <div className="container grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
            Seja Bem Vinde!
          </h2>
          <p className="text-base lg:text-xl">
            Expresse aqui seus pensamentos e opiniões
          </p>
          <div className="flex justify-around gap-4">
            <button className="rounded border-2 border-solid border-white px-4 py-2 font-bold  text-white transition-colors hover:bg-white hover:text-indigo-900 focus-visible:bg-white focus-visible:text-indigo-900">
              Nova Postagem
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <img
            src="https://imgur.com/VpwApCU.png"
            alt="Imagem da Página Home"
            width="400"
          />
        </div>
      </div>
    </main>
  );
}
