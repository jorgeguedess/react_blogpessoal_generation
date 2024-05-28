import { ListaPostagens } from "../../components/postagens/listapostagens/ListaPostagens";
import ModalPostagem from "../../components/postagens/modalpostagem/ModalPostagem";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col justify-center bg-indigo-900 py-4 text-white md:py-6">
      <div className="container grid grid-cols-1 items-center gap-8 px-2 md:grid-cols-2 ">
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-bold md:text-3xl lg:text-5xl">
            Seja Bem Vinde!
          </h2>
          <p className="text-base lg:text-xl">
            Expresse aqui seus pensamentos e opiniões
          </p>
          <div className="flex justify-around gap-4">
            <ModalPostagem />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <img
            src="https://imgur.com/VpwApCU.png"
            alt="Imagem da Página Home"
            width="400"
          />
        </div>
      </div>

      <ListaPostagens />
    </main>
  );
}
