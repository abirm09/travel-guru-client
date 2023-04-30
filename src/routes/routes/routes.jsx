import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/Main";
import Home from "../../pages/home/Home";
import PlaceDetailsBooking from "../../pages/home/PlaceDetailsBooking/PlaceDetailsBooking";

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
]);

export default routes;
