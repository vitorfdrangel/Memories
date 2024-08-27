import { NavLink } from "react-router-dom";

// Style
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>
        <NavLink to={"/"}>Memories</NavLink>
      </h2>
      <ul>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/add-memory"}>Adicionar memórias</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
