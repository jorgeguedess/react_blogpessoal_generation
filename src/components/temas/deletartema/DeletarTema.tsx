/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { buscar, deletar } from "../../../services/Service";
import { useNavigate, useParams } from "react-router-dom";
import Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";
import { Container } from "../../container/Container";
import { ToastAlerta } from "../../../utils/ToastAlerta";

export const DeletarTema = () => {
  const navigate = useNavigate();

  // Receber os dados do Tema, que será cadastrado ou atualizado
  const [tema, setTema] = useState<Tema>({} as Tema);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        ToastAlerta("O token expirou!", "erro");
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");

      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function retornar() {
    navigate("/temas");
  }

  async function deletarTema() {
    setIsLoading(true);

    try {
      await deletar(`/temas/${id}`, {
        headers: { Authorization: token },
      });
      ToastAlerta("O Tema foi apagado com sucesso!", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        ToastAlerta("O token expirou!", "erro");
        handleLogout();
      } else {
        ToastAlerta("Erro ao Excluir o Tema!", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <Container>
      <div className="container mx-auto w-1/3">
        <h1 className="my-4 text-center text-4xl">Deletar tema</h1>

        <p className="mb-4 text-center font-semibold">
          Você tem certeza de que deseja apagar o tema a seguir?
        </p>

        <div className="flex flex-col justify-between overflow-hidden rounded-2xl border">
          <header className="bg-indigo-600 px-6 py-2 text-2xl font-bold text-white">
            Tema
          </header>
          <p className="h-full bg-slate-200 p-8 text-3xl">{tema.descricao}</p>
          <div className="flex">
            <button
              className="w-full bg-red-400 py-2 text-slate-100 hover:bg-red-600"
              onClick={retornar}
            >
              Não
            </button>
            <button
              className="flex w-full items-center justify-center bg-indigo-400 text-slate-100 hover:bg-indigo-600"
              onClick={deletarTema}
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
