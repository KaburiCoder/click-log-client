import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { LoginPage } from "@/pages/auth";
import { ListPage } from "@/pages/list";
import { PrivateRoute } from "./private-route";
import { ErrorLogsPage } from "@/pages/error-logs";
import { SlowQueriesPage } from "@/pages/slow-queries";
import { paths } from "@/shared/paths";

export const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        path: paths.login,
        element: <LoginPage />,
      },
      {
        element: <Layout />,
        children: [
          {
            path: paths.root,
            element: <ErrorLogsPage />,
          },
          {
            path: paths.errorLogs,
            element: <ErrorLogsPage />,
          },
          {
            path: paths.slowQueries,
            element: <SlowQueriesPage />,
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
