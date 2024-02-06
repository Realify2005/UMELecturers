import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/Login"
import Logout from "./components/Logout"
import Signup from "./components/Signup"
import Welcome from "./components/Welcome"
import Home from "./components/Home"
import AddStaff from "./components/AddStaff"
import StaffPage from "./components/StaffPage"
import ErrorPage from "./components/ErrorPage"
import SearchResults from "./components/SearchResults"

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Welcome />,
      errorElement: <ErrorPage />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/logout",
      element: <Logout />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/home",
      element: <Home />,
      children: [
        {
          path: "add-staff",
          element: <AddStaff />
        },
        {
          path: "staff/:staffNameHyphened",
          element: <StaffPage />
        },
        {
          path: "search",
          element: <SearchResults />
        }
      ]
    }
  ])
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
