import { Link } from "react-router-dom";
import '../../src/Styles/sideNavbar.css'

export default function SideNavbar() {
  return (
    <div className="sidebar">
      <h3>Homecare</h3>
      <ul>
        <li>
          <Link to="/">Doctor List</Link>
        </li>
        <li>
          <Link to="/patients">Patient List</Link>
        </li>
      </ul>
    </div>
  );
}
