import { createBrowserRouter } from "react-router-dom";
// import LayoutMain from "../Layout/LayoutMain";
import App from "../App";
import Home from "../Pages/Home/Home/Home";
import PetListing from "../Pages/PetListing/PetListing";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "petListing",
        element: <PetListing></PetListing>,
      },
    ],
  },
]);
