import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './components/login'
import Logout from "./components/logout"
import Signup from "./components/signup"
import Welcome from "./components/welcome"
import Home from "./components/home"
import AddStaff from "./components/addStaff"
import EditStaff from "./components/EditStaff"
import StaffPage from "./components/staffPage"
import ErrorPage from "./components/errorPage"
import SearchResults from "./components/searchResults"
import DisplayAbout from "./components/displayAbout"
import WelcomePage from "./components/welcomePage"

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
