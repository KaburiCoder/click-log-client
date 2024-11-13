import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { LoginPage } from "@/pages/auth";
import { ListPage } from "@/pages/list";
import { PrivateRoute } from "./private-route";
import { ErrorLogsPage } from "@/pages/error-logs";

export const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <ErrorLogsPage />,
          },
          {
            path: "/error-logs",
            element: <ErrorLogsPage />,
          },
          {
            path: "/setting-records",
            element: <div>Setting Records Page</div>,
          },
          {
            path: "/applications",
            element: <ListPage />,
          },
          {
            path: "/settings",
            element: <div>Settings Page</div>,
          },
          {
            path: "/user-info",
            element: <div>User Info Page</div>,
          },
          {
            path: "/documentation",
            element: <div>Documentation Page</div>,
          },
        ],
      },
    ],
  },
]);
