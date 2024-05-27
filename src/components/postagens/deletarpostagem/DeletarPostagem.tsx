/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Postagem from "../../../models/Postagem";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { Container } from "../../container/Container";

export const DeletarPostagem = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
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
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarPostagem() {
    setIsLoading(true);

    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      ToastAlerta("Postagem apagada com sucesso", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("403")) {
        ToastAlerta("O token expirou, favor logar novamente", "info");
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar a postagem.", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/postagens");
  }

  return (
    <Container>
      <div className="container mx-auto w-1/3">
        <h1 className="my-4 text-center text-4xl">Deletar Postagem</h1>

        <p className="mb-4 text-center font-semibold">
          Você tem certeza de que deseja apagar a postagem a seguir?
        </p>

        <div className="flex flex-col justify-between overflow-hidden rounded-2xl border">
          <header className="bg-indigo-600 px-6 py-2 text-2xl font-bold text-white">
            Postagem
          </header>
          <div className="flex flex-col gap-4 p-4">
            <p className="h-full text-xl">{postagem.titulo}</p>
            <p>{postagem.texto}</p>
          </div>
          <div className="flex">
            <button
              className="w-full bg-red-400 py-2 text-slate-100 hover:bg-red-600"
              onClick={retornar}
            >
              Não
            </button>
            <button
              className="flex w-full items-center 
                justify-center bg-indigo-400 text-slate-100 hover:bg-indigo-600"
              onClick={deletarPostagem}
            >
              {isLoading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                />
              ) : (
                <span>Sim</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};
