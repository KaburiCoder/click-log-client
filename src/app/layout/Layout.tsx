import { Outlet } from "react-router-dom";

export const Layout = () => {
  return <div className="flex min-h-screen flex-col">
    <Outlet/>
  </div>;
};
