import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <section className="flex w-full items-center p-16 dark:bg-gray-50 dark:text-gray-800">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="max-w-md text-center">
          <h2 className="mb-8 text-9xl font-extrabold dark:text-gray-400">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Desculpe, não conseguimos encontrar esta página.
          </p>
          <p className="mb-8 mt-4 dark:text-gray-600">
            Mas não se preocupe, você pode encontrar muitas outras coisas em
            nossa página inicial.
          </p>
          <Link
            rel="noopener noreferrer"
            to="/"
            className="rounded border-2 border-solid border-indigo-900 px-4 py-2 font-bold  text-indigo-900 transition-colors hover:bg-indigo-900 hover:text-white focus-visible:bg-indigo-900 focus-visible:text-white"
          >
            Voltar à página inicial
          </Link>
        </div>
      </div>
    </section>
  );
};
