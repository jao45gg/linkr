import { Routes, Route } from "react-router-dom";
import PersistLogin from "./components/redirects/PersistLogin.js";
import RedirectIfAuth from "./components/redirects/RedirectIfAuth.js";
import RequireAuth from "./components/redirects/RequireAuth.js";
import Layout from "./components/Layout.js";
import Feed from "./routes/Feed.js";
import SignUp from "./routes/SignUp.js";
import SignIn from "./routes/SignIn.js";
import Auth from "./components/authRoute/Auth.js";
import Timeline from "./routes/Timeline.js";
import Users from "./routes/Users.js";

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
            <Route path="/user/:id" element={<Users/>} />
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
