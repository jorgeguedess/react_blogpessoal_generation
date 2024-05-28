import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";
import { links } from "../../data/linksMenu";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

export const Header = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { handleLogout, usuario } = useContext(AuthContext);

  const handleToggleMenu = () => {
    setIsMenuOpen((prevMenu) => !prevMenu);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  function logout() {
    handleCloseMenu();
    handleLogout();
    ToastAlerta("O Usuário foi desconectado com sucesso!", "info");

    navigate("/login");
  }

  if (!usuario.token) return null;

  return (
    <header
      className="flex w-full justify-center
  bg-indigo-900 py-4 text-white"
    >
      <div className="justify-centerx-auto container flex flex-wrap items-center justify-between gap-2 px-4 text-lg">
        <Link to="/" className="text-2xl font-bold" onClick={handleCloseMenu}>
          Blog Pessoal
        </Link>

        <div className="flex items-center md:hidden">
          <button
            type="button"
            className="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={handleToggleMenu}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <List className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        <nav
          className={`absolute left-0 top-16 h-fit w-full transform bg-indigo-800 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:static md:flex md:w-auto md:translate-x-0 md:bg-transparent`}
        >
          <ul className="flex flex-col items-center justify-center md:flex-row md:gap-4 md:p-0">
            {links.map((link) => (
              <li key={link.id} className="flex w-full text-center md:w-fit">
                <Link
                  to={link.path}
                  className="block w-full rounded px-1 py-4 transition-colors hover:bg-indigo-700 focus-visible:bg-indigo-700 md:py-2 md:hover:bg-indigo-900 md:hover:underline md:focus-visible:bg-indigo-900"
                  onClick={handleCloseMenu}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="flex w-full text-center md:w-fit">
              <button
                onClick={logout}
                className="block w-full rounded px-1 py-4 transition-colors hover:bg-indigo-700 focus-visible:bg-indigo-700 md:py-2 md:hover:bg-indigo-900 md:hover:underline md:focus-visible:bg-indigo-900"
              >
                Sair
              </button>
            </li>
            {usuario.token && (
              <p className="hidden md:block">Olá {usuario.nome}</p>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
