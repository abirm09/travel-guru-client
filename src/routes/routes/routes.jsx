import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/Main";
import Home from "../../pages/home/Home";
import PlaceDetailsBooking from "../../pages/home/PlaceDetailsBooking/PlaceDetailsBooking";
import Accounts from "../../layouts/Accounts";
import Login from "../../pages/Accounts/Login/Login";
import Registration from "../../pages/Accounts/Registration/Registration";
import PasswordReset from "../../pages/Accounts/PasswordReset/PasswordReset";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () =>
          fetch("https://travel-guru-server-abirm09.vercel.app/places/all"),
      },
      {
        path: "/place/:id",
        element: <PlaceDetailsBooking />,
        loader: ({ params }) =>
          fetch(
            `https://travel-guru-server-abirm09.vercel.app/place/id/${params.id}`
          ),
      },
    ],
  },
  {
    path: "/accounts",
    element: <Accounts />,
    children: [
      {
        path: "/accounts/login",
        element: <Login />,
      },
      {
        path: "/accounts/registration",
        element: <Registration />,
      },
      {
        path: "/accounts/reset-password",
        element: <PasswordReset />,
      },
    ],
  },
]);

export default routes;
