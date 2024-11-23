import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Home";
import Kitchensection from "./pages/Kitchen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/kitchen-tips",
    element: <Kitchensection />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
