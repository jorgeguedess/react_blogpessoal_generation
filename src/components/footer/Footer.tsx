import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const data = new Date().getFullYear();

  return (
    <footer className="flex justify-center bg-indigo-900 text-white">
      <div className="container flex flex-col items-center py-4">
        <p className="text-xl font-bold">
          Blog Pessoal Generation | Copyright: {data}
        </p>
        <p className="text-lg">Acesse nossas redes sociais</p>
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
            <Link to="https://www.instagram.com/juninho4492/" target="_blank">
              <FacebookLogo size={48} weight="bold" />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
