import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from '/src/components/Login'
import Logout from "/src/components/Logout"
import Signup from "/src/components/Signup"
import Welcome from "/src/components/Welcome"
import Home from "/src/components/Home"
import AddStaff from "/src/components/AddStaff"
import EditStaff from "/src/components/EditStaff"
import StaffPage from "/src/components/StaffPage"
import ErrorPage from "/src/components/ErrorPage"
import SearchResults from "/src/components/SearchResults"
import DisplayAbout from "/src/components/DisplayAbout"
import WelcomePage from "/src/components/WelcomePage"

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
          path: "about/:username",
          element: <DisplayAbout />
        },
        {
          path: "add-staff",
          element: <AddStaff />
        },
        {
          path: "staff/:staffNameHyphened",
          element: <StaffPage />
        },
        {
          path: "edit-staff/:commentId",
          element: <EditStaff />
        },
        {
          path: "search",
          element: <SearchResults />
        },
        {
          path: "welcome",
          element: <WelcomePage />
        }
      ]
    }
  ])
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
