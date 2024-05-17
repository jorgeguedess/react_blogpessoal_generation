export default function Home() {
  return (
    <main className="flex flex-1 justify-center bg-indigo-900 px-2 text-white">
      <div className="container grid grid-cols-1 items-center md:grid-cols-2">
        <div className="flex max-w-7xl flex-col items-center justify-center gap-4">
          <h2 className="text-5xl font-bold">Seja Bem Vinde!</h2>
          <p className="text-xl">Expresse aqui seus pensamentos e opiniões</p>
          <div className="flex justify-around gap-4">
            <button className="rounded border-2 border-solid border-white px-4 py-2 font-bold  text-white transition-colors hover:bg-white hover:text-indigo-900 focus-visible:bg-white focus-visible:text-indigo-900">
              Nova Postagem
            </button>
          </div>
        </div>

        <div className="flex max-w-7xl flex-col items-center">
          <img
            src="https://imgur.com/VpwApCU.png"
            alt="Imagem da Página Home"
            width="400"
          />
        </div>
      </div>
    </main>
  );
}
