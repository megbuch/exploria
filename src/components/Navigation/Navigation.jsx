import { Link } from "react-router-dom";
import "./Navigation.scss";

export default function Navigation() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/parks">Parks</Link>
      </li>
    </ul>
  );
}
