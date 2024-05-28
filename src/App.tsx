import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { NotFound } from "./components/not-found/NotFound";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRouter from "./helper/ProtectedRouter";
import { ListaTemas } from "./components/temas/listatemas/ListaTemas";
import { FormTema } from "./components/temas/formtema/FormTema";
import { DeletarTema } from "./components/temas/deletartema/DeletarTema";
import { ListaPostagens } from "./components/postagens/listapostagens/ListaPostagens";
import { FormPostagem } from "./components/postagens/formpostagem/FormPostagem";
import { DeletarPostagem } from "./components/postagens/deletarpostagem/DeletarPostagem";
import Perfil from "./pages/perfil/Perfil";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <ToastContainer />

      <BrowserRouter>
        <div className="flex min-h-screen flex-col bg-indigo-900">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/"
              element={
                <ProtectedRouter>
                  <Home />
                </ProtectedRouter>
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRouter>
                  <Perfil />
                </ProtectedRouter>
              }
            />
            <Route
              path="/temas"
              element={
                <ProtectedRouter>
                  <ListaTemas />
                </ProtectedRouter>
              }
            />
            <Route
              path="/cadastrartema"
              element={
                <ProtectedRouter>
                  <FormTema />
                </ProtectedRouter>
              }
            />
            <Route
              path="/editartema/:id"
              element={
                <ProtectedRouter>
                  <FormTema />
                </ProtectedRouter>
              }
            />
            <Route
              path="/deletartema/:id"
              element={
                <ProtectedRouter>
                  <DeletarTema />
                </ProtectedRouter>
              }
            />
            <Route
              path="/postagens"
              element={
                <ProtectedRouter>
                  <ListaPostagens />
                </ProtectedRouter>
              }
            />
            <Route path="/cadastrarpostagem" element={<FormPostagem />} />
            <Route
              path="/editarpostagem/:id"
              element={
                <ProtectedRouter>
                  <FormPostagem />
                </ProtectedRouter>
              }
            />
            <Route
              path="/deletarpostagem/:id"
              element={
                <ProtectedRouter>
                  <DeletarPostagem />
                </ProtectedRouter>
              }
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
