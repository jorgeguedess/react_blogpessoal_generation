import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export const Footer = () => {
  const data = new Date().getFullYear();
  const { usuario } = useContext(AuthContext);

  if (!usuario.token) return null;

  return (
    <footer className="flex justify-center bg-indigo-900 text-white">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 py-4">
        <p className="text-center text-lg font-bold md:text-xl">
          Blog Pessoal Jorge Guedes | Copyright: {data}
        </p>
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg">Acesse minhas redes sociais</p>
          <ul className="flex gap-2">
            <li>
              <Link
                to="https://www.linkedin.com/in/jorgeguedess/"
                target="_blank"
              >
                <LinkedinLogo size={48} weight="bold" />
              </Link>
            </li>
            <li>
              <Link to="https://www.instagram.com/juninho4492/" target="_blank">
                <InstagramLogo size={48} weight="bold" />
              </Link>
            </li>
            <li>
              <Link to="https://www.facebook.com/" target="_blank">
                <FacebookLogo size={48} weight="bold" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
