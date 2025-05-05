import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Register />} />
      <Route path="login" element={<Login />} />
      {/* <Route path="regester" element={<Register />} />    */}
    </>
  )
);

export default router;
