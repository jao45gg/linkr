import { Routes, Route } from "react-router-dom";
import PersistLogin from "./components/redirects/PersistLogin.jsx";
import RedirectIfAuth from "./components/redirects/RedirectIfAuth.jsx";
import RequireAuth from "./components/redirects/RequireAuth.jsx";
import Layout from "./components/Layout.jsx";
import Feed from "./routes/Feed.jsx";
import SignUp from "./routes/SignUp.jsx";
import SignIn from "./routes/SignIn.jsx";
import Auth from "./components/authRoute/Auth.jsx";
import Timeline from "./routes/Timeline.jsx";
import Users from "./routes/Users.jsx";

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
