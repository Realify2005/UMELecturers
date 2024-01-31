import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/login"
import Signup from "./components/signup"
import Welcome from "./components/welcome"
import Home from "./components/home"

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
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/home",
      element: <Home />
    }
  ])
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
