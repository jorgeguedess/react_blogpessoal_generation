import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { NotFound } from "./components/not-found/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col bg-indigo-900">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
