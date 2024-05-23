import { Link } from "react-router-dom";
import Tema from "../../../models/Tema";

interface CardTemasProps {
  tema: Tema;
}

export const CardTemas = ({ tema }: CardTemasProps) => {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-2xl border">
      <header className="bg-indigo-800 px-6 py-2 text-2xl font-bold text-white">
        Tema
      </header>
      <p className="h-full bg-slate-200 p-8 text-3xl">{tema.descricao}</p>{" "}
      <div className="flex">
        <Link
          to={`/editarTema/${tema.id}`}
          className="flex w-full items-center justify-center bg-indigo-400 py-2 text-slate-100 hover:bg-indigo-800"
        >
          <button>Editar</button>
        </Link>
        <Link
          to={`/deletartema/${tema.id}`}
          className="flex w-full items-center justify-center bg-red-400 text-slate-100 hover:bg-red-700"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
};
