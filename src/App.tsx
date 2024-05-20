import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { NotFound } from "./components/not-found/NotFound";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <div className="flex min-h-screen flex-col bg-indigo-900">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
