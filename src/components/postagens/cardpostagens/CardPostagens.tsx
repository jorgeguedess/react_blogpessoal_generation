import { Link } from "react-router-dom";
import Postagem from "../../../models/Postagem";

interface CardPostagensProps {
  postagem: Postagem;
}

export const CardPostagens = ({ postagem }: CardPostagensProps) => {
  return (
    <div
      className="flex flex-col 
    justify-between overflow-hidden rounded border border-slate-900"
    >
      <div>
        <div className="flex w-full items-center gap-4 bg-indigo-400 px-4 py-2">
          <img
            src={postagem.usuario?.foto}
            className="h-12 rounded-full"
            alt={postagem.usuario?.nome}
          />
          <h3 className="text-center text-lg font-bold uppercase">
            {postagem.usuario?.nome}
          </h3>
        </div>
        <div className="p-4 ">
          <h4 className="text-lg font-semibold uppercase">{postagem.titulo}</h4>
          <p>{postagem.texto}</p>
          <p>Tema: {postagem.tema?.descricao}</p>
          <p>
            Data:{" "}
            {new Intl.DateTimeFormat(undefined, {
              dateStyle: "full",
              timeStyle: "medium",
            }).format(new Date(postagem.data))}
          </p>
        </div>
      </div>
      <div className="flex">
        <Link
          to={`/editarpostagem/${postagem.id}`}
          className="flex w-full items-center 
            justify-center bg-indigo-400 py-2 text-white hover:bg-indigo-800"
        >
          <button>Editar</button>
        </Link>
        <Link
          to={`/deletarpostagem/${postagem.id}`}
          className="flex w-full 
            items-center justify-center bg-red-400 text-white hover:bg-red-700"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
};
