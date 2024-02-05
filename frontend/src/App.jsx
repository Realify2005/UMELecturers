import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/login"
import Logout from "./components/logout"
import Signup from "./components/signup"
import Welcome from "./components/welcome"
import Home from "./components/home"
import AddStaff from "./components/addStaff"

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Welcome />
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
        }
      ]
    }
  ])
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
