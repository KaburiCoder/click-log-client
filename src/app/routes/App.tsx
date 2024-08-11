import { RootPage } from "@pages/root";
import { paths } from "@shared/paths";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../layout";

const router = createBrowserRouter([
  {
    path: paths.root,
    element: <Layout />,
    children: [
      {
        path: paths.root,
        element: <RootPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
