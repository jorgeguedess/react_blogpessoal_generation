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

function App() {
  return (
    <AuthProvider>
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
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
