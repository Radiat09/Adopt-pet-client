import { createBrowserRouter } from "react-router-dom";
// import LayoutMain from "../Layout/LayoutMain";
import App from "../App";
import Home from "../Pages/Home/Home/Home";
import PetListing from "../Pages/PetListing/PetListing";
import PetDetails from "../Pages/PetListing/PetDetails/PetDetails";
import axios from "axios";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import DonationCampaign from "../Pages/DonationCampaign/DonationCampaign";
import DonationDetails from "../Pages/DonationDetails/DonationDetails";
import Dashboard from "../Layout/Dashboard";
import AddAPet from "../Pages/DashBoard/AddAPet/AddAPet";
import MyAddedPets from "../Pages/DashBoard/MyAddedPets/MyAddedPets";
import UpdatePet from "../Pages/DashBoard/UpdatePet/UpdatePet";
import CreateDonationCampaign from "../Pages/DashBoard/CreateDonationCampaign/CreateDonationCampaign";
import MyDonationCampaigns from "../Pages/DashBoard/MyDonationCampaigns/MyDonationCampaigns";
import UpdateDonationCampaign from "../Pages/DashBoard/UpdateDonationCampaign/UpdateDonationCampaign";
import MyDonations from "../Pages/DashBoard/MyDonations/MyDonations";
import AdoptionRequest from "../Pages/DashBoard/AdoptionRequest/AdoptionRequest";
import AllUsers from "../Pages/DashBoard/Admin/AllUsers/AllUsers";
import AdminRoutes from "./AdminRoutes";
import AllPets from "../Pages/DashBoard/Admin/AllPets/AllPets";
import AllDonation from "../Pages/DashBoard/Admin/AllDonation/AllDonation";
import PrivateRoute from "./PrivateRoute";

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
        path: "/petListing",
        element: <PetListing></PetListing>,
      },
      {
        path: "/petListing/:id",
        element: (
          <PrivateRoute>
            <PetDetails></PetDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          axios.get(
            `https://adopt-pet-server.vercel.app/api/v1/pets/${params.id}`
          ),
      },
      {
        path: "/donations",
        element: <DonationCampaign></DonationCampaign>,
      },
      {
        path: "/donations/:id",
        element: (
          <PrivateRoute>
            <DonationDetails></DonationDetails>,
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "addAPet",
        element: (
          <PrivateRoute>
            <AddAPet></AddAPet>
          </PrivateRoute>
        ),
      },
      {
        path: "myAddedPets",
        element: (
          <PrivateRoute>
            <MyAddedPets></MyAddedPets>
          </PrivateRoute>
        ),
      },
      {
        path: "updatePet/:id",
        element: (
          <PrivateRoute>
            <UpdatePet></UpdatePet>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          axios.get(
            `https://adopt-pet-server.vercel.app/api/v1/pets/${params?.id}`
          ),
      },
      {
        path: "createDonationCampaign",
        element: (
          <PrivateRoute>
            <CreateDonationCampaign></CreateDonationCampaign>,
          </PrivateRoute>
        ),
      },
      {
        path: "myDonationsCampaigns",
        element: (
          <PrivateRoute>
            <MyDonationCampaigns></MyDonationCampaigns>,
          </PrivateRoute>
        ),
      },
      {
        path: "updateCampaign/:id",
        element: (
          <PrivateRoute>
            <UpdateDonationCampaign></UpdateDonationCampaign>,
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          axios.get(
            `https://adopt-pet-server.vercel.app/api/v1/donationCampaigns/${params.id}`
          ),
      },
      {
        path: "myDonations",
        element: (
          <PrivateRoute>
            <MyDonations></MyDonations>,
          </PrivateRoute>
        ),
      },
      {
        path: "adoptionRequest",
        element: (
          <PrivateRoute>
            <AdoptionRequest></AdoptionRequest>,
          </PrivateRoute>
        ),
      },
      // Admin Routes
      {
        path: "allUsers",
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <AllUsers></AllUsers>,
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "allPets",
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <AllPets></AllPets>
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "allDonation",
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <AllDonation />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "register",
    element: <Register></Register>,
  },
]);
