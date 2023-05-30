import { Routes, Route } from "react-router-dom";
import PersistLogin from "./components/redirects/PersistLogin";
import RedirectIfAuth from "./components/redirects/RedirectIfAuth";
import RequireAuth from "./components/redirects/RequireAuth";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}> {/* Persistencia de login */}
        <Route element={<Layout />}> {/* Componente pai responsavel pelo layout das childs */}
          <Route path="/" element={<Feed />} /> 
          <Route element={<RequireAuth />}> {/* Rotas protegidas, apenas logado pode acessar */}
            {/* <Route path="/home" element={<Home />} /> */}
          </Route>
        </Route>
        <Route element={<RedirectIfAuth />}> {/* Redirecionar caso esteja logado */}
        <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
      </Route>
    </Routes>
  );
}