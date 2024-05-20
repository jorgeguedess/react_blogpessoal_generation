import { PropsWithChildren, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { NotFound } from "../components/not-found/NotFound";

const ProtectedRouter = ({ children }: PropsWithChildren) => {
  const { usuario } = useContext(AuthContext);

  if (usuario.token) return children;
  else if (!usuario.token) return <Navigate to="/login" />;
  else {
    return <NotFound />;
  }
};

export default ProtectedRouter;
