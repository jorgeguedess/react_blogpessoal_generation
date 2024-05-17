import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header
      className="flex w-full justify-center
  bg-indigo-900 py-4 text-white"
    >
      <div className="container flex justify-between text-lg">
        <Link to="/" className="text-2xl font-bold">
          Blog Pessoal
        </Link>

        <nav>
          <ul className="flex gap-4">
            <li>
              <Link to="/postagens" className="hover:underline">
                Postagens
              </Link>
            </li>
            <li>
              <Link to="/temas" className="hover:underline">
                Temas
              </Link>
            </li>
            <li>
              <Link to="/cadastrartema" className="hover:underline">
                Cadastrar tema
              </Link>
            </li>
            <li>
              <Link to="/perfil" className="hover:underline">
                Perfil
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">
                Sair
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
