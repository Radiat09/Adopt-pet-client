import { createBrowserRouter } from "react-router-dom";
// import LayoutMain from "../Layout/LayoutMain";
import App from "../App";
import Home from "../Pages/Home/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: "/",
        element: <Home />,
      },
    ],
  },
]);
