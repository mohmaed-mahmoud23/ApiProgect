import { Link, NavLink } from "react-router-dom";
import Button from "../ui/Button";

function Navbar() {
  const storageKey = "logedn";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const Logout = () => {
    localStorage.removeItem(storageKey);
    window.location.reload();
  };
  return (
    <div>
      <nav className="  space-x-20 max-w-lg mx-auto mt-7 mb-20 px-3 py-5 rounded-md">
        <ul className="flex items-center justify-between">
          <li className="text-black duration-200 font-semibold text-lg">
            <NavLink to="/">Home</NavLink>
          </li>
          {userData ? (
            <>
              <li>
                <Link to={"/Profile"}> Profile</Link>
              </li>
              <Button onClick={Logout}>Logout</Button>
            </>
          ) : (
            <>
              <li className="text-black duration-200 font-semibold text-lg">
                <NavLink to="/regester">regester</NavLink>
              </li>
              <li className="text-black duration-200 font-semibold text-lg">
                <NavLink to="/Login">Login</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
