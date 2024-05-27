/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tema from "../../../models/Tema";
import Postagem from "../../../models/Postagem";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";

export const FormPostagem = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);

  const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPostagemPorId(id: string) {
    await buscar(`/postagens/${id}`, setPostagem, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscarTemaPorId(id: string) {
    await buscar(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscarTemas() {
    await buscar("/temas", setTemas, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();

    if (id !== undefined) {
      buscarPostagemPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate("/postagens");
  }

  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id != undefined) {
      try {
        await atualizar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        alert("Postagem atualizada com sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          alert("Erro ao atualizar a Postagem");
        }
      }
    } else {
      try {
        await cadastrar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        alert("Postagem cadastrada com sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          alert("Erro ao cadastrar a Postagem");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  const carregandoTema = tema.descricao === "";

  return (
    <div className="flex-1 bg-white py-12 md:py-16">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="my-8 text-center text-4xl">
          {id !== undefined ? "Editar Postagem" : "Cadastrar Postagem"}
        </h1>

        <form
          className="flex w-1/2 flex-col gap-4"
          onSubmit={gerarNovaPostagem}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="titulo">Título da Postagem</label>
            <input
              type="text"
              placeholder="Titulo"
              name="titulo"
              required
              className="rounded border-2 border-slate-700 p-2"
              value={postagem.titulo}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="titulo">Texto da Postagem</label>
            <input
              type="text"
              placeholder="Texto"
              name="texto"
              required
              className="rounded border-2 border-slate-700 p-2"
              value={postagem.texto}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Tema da Postagem</p>
            <select
              name="tema"
              id="tema"
              className="rounded border border-slate-800 p-2"
              onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
            >
              <option value="" selected disabled>
                Selecione um Tema
              </option>

              {temas.map((tema) => (
                <>
                  <option value={tema.id}>{tema.descricao}</option>
                </>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="mx-auto flex w-1/2 justify-center
                           rounded bg-indigo-400 py-2 font-bold text-white hover:bg-indigo-800 disabled:bg-slate-200"
            disabled={carregandoTema}
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
              <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
