import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/login"
import Signup from "./components/signup"
import Welcome from "./components/welcome"

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
    }
  ])
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
