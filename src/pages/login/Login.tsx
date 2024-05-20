import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UsuarioLogin from "../../models/UsuarioLogin";
import { AuthContext } from "../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";

export default function Login() {
  const navigate = useNavigate();

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin,
  );

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/");
    }
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div className="grid w-full flex-1 grid-cols-1 place-items-center bg-white py-16 font-bold md:py-0 lg:grid-cols-2">
      <form
        className="container flex w-full max-w-96 flex-col items-center justify-center gap-4"
        onSubmit={login}
      >
        <h2 className="text-5xl text-slate-900 ">Entrar</h2>
        <div className="flex w-full flex-col">
          <label htmlFor="usuario">E-mail</label>
          <input
            type="email"
            id="usuario"
            name="usuario"
            placeholder="Usuario"
            className="rounded border-2 border-slate-700 p-2"
            value={usuarioLogin.usuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            required
          />
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            className="rounded border-2 border-slate-700 p-2"
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            required
          />
        </div>
        <button
          type="submit"
          className="flex w-1/2 justify-center rounded bg-indigo-400 py-2 text-white hover:bg-indigo-900"
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
            <span>Entrar</span>
          )}
        </button>

        <hr className="w-full border-slate-800" />

        <p>
          Ainda não tem uma conta?{" "}
          <Link to="/cadastro" className="text-indigo-800 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </form>
      <div className="hidden min-h-screen w-full bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] bg-cover bg-center bg-no-repeat lg:block"></div>
    </div>
  );
}
