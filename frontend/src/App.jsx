import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/login"

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
  ])
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
