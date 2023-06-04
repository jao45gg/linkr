import { Routes, Route } from "react-router-dom";
import PersistLogin from "./components/redirects/PersistLogin.js";
import RedirectIfAuth from "./components/redirects/RedirectIfAuth.js";
import RequireAuth from "./components/redirects/RequireAuth.js";

import Auth from "./components/authRoute/Auth.js";
import SignUp from "./routes/SignUp.js";
import SignIn from "./routes/SignIn.js";

import Layout from "./components/Layout.js";
import Timeline from "./routes/Timeline.js";
import Redirect from "./routes/Redirect";
import Users from "./routes/Users.js";

export default function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<Layout />}>
          <Route element={<RequireAuth />}>
            {/* Abaixo rotas protegidas, apenas logado pode acessar */}
            {/* <Route path="/" element={<Redirect />} /> */}
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/user/:id" element={<Users />} />
          </Route>
        </Route>
        <Route element={<RedirectIfAuth />}>
          {/* Abaixo redirecionar caso esteja logado */}
          <Route element={<Auth />}>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" element={<SignIn />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
