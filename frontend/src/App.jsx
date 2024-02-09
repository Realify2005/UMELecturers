import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { inject } from '@vercel/analytics';
import Login from './components/Login'
import Logout from "./components/Logout"
import Signup from "./components/Signup"
import Welcome from "./components/Welcome"
import Home from "./components/Home"
import AddStaff from "./components/AddStaff"
import EditStaff from "./components/EditStaff"
import StaffPage from "./components/StaffPage"
import ErrorPage from "./components/ErrorPage"
import SearchResults from "./components/SearchResults"
import UserProfile from "./components/UserProfile"
import WelcomePage from "./components/WelcomePage"
import Statistics from "./components/StatisticsPage"
import CoursePage from "./components/CoursePage"

const App = () => {
  inject(); // Vercel analytics
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
          path: "user/:username",
          element: <UserProfile />
        },
        {
          path: "course/:courseCode",
          element: <CoursePage />
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
        },
        {
          path: "stats",
          element: <Statistics />
        }
      ]
    }
  ])
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
