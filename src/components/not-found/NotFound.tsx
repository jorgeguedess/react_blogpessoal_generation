import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <section className="flex w-full flex-1 items-center bg-gray-50 py-16">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="w-full max-w-md text-center">
          <h2 className="mb-8 text-wrap break-words text-8xl font-extrabold text-gray-400 md:text-9xl">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Desculpe, não conseguimos encontrar esta página.
          </p>
          <p className="mb-8 mt-4 text-gray-600">
            Mas não se preocupe, você pode encontrar muitas outras coisas em
            nossa página inicial.
          </p>
          <Link
            rel="noopener noreferrer"
            to="/"
            className="inline-block rounded border-2 border-solid border-indigo-900 px-4 py-2  font-bold text-indigo-900 transition-colors hover:bg-indigo-900 hover:text-white focus-visible:bg-indigo-900 focus-visible:text-white"
          >
            Voltar à página inicial
          </Link>
        </div>
      </div>
    </section>
  );
};
