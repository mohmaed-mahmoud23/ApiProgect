import { Outlet } from "react-router-dom";
import Navbar from "../Navber/Navbar";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
