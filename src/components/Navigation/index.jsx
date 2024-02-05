import { Link } from "react-router-dom";
import "./styles.scss";

export const Navigation = () => {
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
};
