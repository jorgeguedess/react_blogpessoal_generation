/* eslint-disable @typescript-eslint/no-explicit-any */
import { DNA } from "react-loader-spinner";
import { CardPostagens } from "../cardpostagens/CardPostagens";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Postagem from "../../../models/Postagem";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

export const ListaPostagens = () => {
  const navigate = useNavigate();
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPostagens() {
    try {
      await buscar("/postagens", setPostagens, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        ToastAlerta("O token expirou, favor logar novamente", "info");
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarPostagens();
  }, [postagens.length]);

  return (
    <div className="flex-1 bg-white py-12 md:py-16">
      {postagens.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}
      <div
        className="container mx-auto my-4 
        grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {postagens.map((postagem) => (
          <CardPostagens key={postagem.id} postagem={postagem} />
        ))}
      </div>
    </div>
  );
};
