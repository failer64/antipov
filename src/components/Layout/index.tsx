import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const Layout = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  if (!isAuth) return <Navigate to="/login" />;

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default Layout;
