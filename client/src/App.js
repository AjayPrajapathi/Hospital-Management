// import LoginPage from "./pages/Homepage/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import DoctorsList from "./pages/Doctor/DoctorsList";
import PatientList from "./pages/Patient/PatientList";
// import LoginPage from './Components/Homepage/LoginPage';

import { RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <DoctorsList /> },
        {
          path: "patients",
          element: <PatientList />,
        },
      ],
    },
  ]);
  return (
    <RouterProvider router={routes} />
    
  );
}

export default App;
