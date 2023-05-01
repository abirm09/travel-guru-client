import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/Main";
import Home from "../../pages/home/Home";
import PlaceDetailsBooking from "../../pages/home/PlaceDetailsBooking/PlaceDetailsBooking";
import Accounts from "../../layouts/Accounts";
import Login from "../../pages/Accounts/Login/Login";
import Registration from "../../pages/Accounts/Registration/Registration";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("http://localhost:5000/places/all"),
      },
      {
        path: "/place/:id",
        element: <PlaceDetailsBooking />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/place/id/${params.id}`),
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
    ],
  },
]);

export default routes;
