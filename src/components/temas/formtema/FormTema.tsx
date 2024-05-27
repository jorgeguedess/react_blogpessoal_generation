/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { Container } from "../../container/Container";

export const FormTema = () => {
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
        alert("O token expirou!");
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/temas");
  }

  async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/temas`, tema, setTema, {
          headers: { Authorization: token },
        });
        alert("Tema atualizado com sucesso!");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          alert("O token Expirou!");
          handleLogout();
        } else {
          alert("Erro ao atualizar o Tema!");
        }
      }
    } else {
      try {
        await cadastrar(`/temas`, tema, setTema, {
          headers: { Authorization: token },
        });
        alert("Tema cadastrado com sucesso!");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          alert("O token Expirou!");
          handleLogout();
        } else {
          alert("Erro ao cadastrar o Tema!");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <Container>
      <div className="container mx-auto flex flex-col items-center justify-center">
        <h1 className="my-8 text-center text-4xl">
          {id === undefined ? "Cadastrar Tema" : "Editar Tema"}
        </h1>

        <form className="flex w-1/2 flex-col gap-4" onSubmit={gerarNovoTema}>
          <div className="flex flex-col gap-2">
            <label htmlFor="descricao">Descrição do tema</label>
            <input
              type="text"
              placeholder="Descrição"
              name="descricao"
              className="rounded border-2 border-slate-700 p-2"
              value={tema.descricao}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <button
            className="mx-auto flex w-1/2 
                               justify-center rounded bg-indigo-400 py-2 text-slate-100 hover:bg-indigo-800"
            type="submit"
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
              <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
            )}
          </button>
        </form>
      </div>
    </Container>
  );
};
