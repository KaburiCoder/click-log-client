import { useIsAuthenticated } from "@/features/auth";
import { paths } from "@/shared/paths";
import { Loading } from "@/widgets/loading";
import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PrivateRoute: FC = () => {
  const { isAuthenticated, isPending } = useIsAuthenticated();
  const location = useLocation();

  if (isPending) {
    return <Loading />;
  }

  if (isAuthenticated) {
    if (location.pathname === paths.login) {
      return <Navigate to={paths.root} replace />;
    }
    return <Outlet />;
  }

  if (location.pathname !== paths.login) {
    return <Navigate to={paths.login} replace state={{ from: location }} />;
  }

  return <Outlet />;
};
