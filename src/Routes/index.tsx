import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import Register from "../auth/Register";
import Login from "../auth/Login";
import ProtectedRoute from "../PrudedctRoute/ProtectedRoute";
import Home from "../pages/Home";
import Profile from "../auth/Profile";
import ErrorHandler from "../Error/ErrorCompontsRoute";

const storageKey = "logedn";
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement ={<ErrorHandler/>}>
      <Route
        index
        element={
          <ProtectedRoute
            isAllowed={userData?.jwt}
            redirectPath="/login"
            data={userData}
          >
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Profile"
        element={
          <ProtectedRoute
            isAllowed={userData?.jwt}
            redirectPath="/Profile"
            data={userData}
          >
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="regester"
        element={
          <ProtectedRoute
            isAllowed={!userData?.jwt}
            redirectPath="/login"
            data={userData}
          >
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path="login"
        element={
          <ProtectedRoute
            isAllowed={!userData?.jwt}
            redirectPath="/"
            data={userData}
          >
            <Login />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

export default router;
