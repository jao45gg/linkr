import { Routes, Route } from "react-router-dom";
import PersistLogin from "./components/redirects/PersistLogin";
import RedirectIfAuth from "./components/redirects/RedirectIfAuth";
import RequireAuth from "./components/redirects/RequireAuth";
import Layout from "./components/Layout";
import Feed from "./routes/Feed";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import Auth from "./components/authRoute/Auth";
import Timeline from "./routes/Timeline";

export default function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<Layout />}>
          {/* Layout: Componente pai responsavel pelo layout das childs */}
          <Route path="/" element={<Feed />} />
          <Route element={<RequireAuth />}>
            {/* Abaixo rotas protegidas, apenas logado pode acessar */}
            <Route path="/timeline" element={<Timeline/>} />
          </Route>
        </Route>
        <Route element={<RedirectIfAuth />}>
          {/* Abaixo redirecionar caso esteja logado */}
          <Route element={<Auth />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
