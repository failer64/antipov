import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Preloader from "./components/Preloader";
import { useAppDispatch } from "./app/hooks";
import { login } from "./app/authReducer";
import "./App.scss";

const Register = lazy(() => import("./components/Forms/RegisterForm"));
const Login = lazy(() => import("./components/Forms/LoginForm"));
const Error = lazy(() => import("./pages/ErrorPage"));
const Layout = lazy(() => import("./components/Layout"));
const Users = lazy(() => import("./pages/Users"));
const User = lazy(() => import("./pages/UserPage"));

function App() {
  const dispatch = useAppDispatch();

  if (sessionStorage.getItem("authToken")) {
    dispatch(login());
  }

  return (
    <>
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Users />} />
            <Route path="users/:userId" element={<User />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
