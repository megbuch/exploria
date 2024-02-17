import { Link } from "react-router-dom";
// import { IoCaretBack } from "react-icons/io5";
import "./styles.scss";

export const Navigation = () => {
  // const navigate = useNavigate();

  return (
    <div id="Navigation">
      {/* <button
        className="icon flat"
        onClick={() => {
          navigate(-1);
        }}
      >
        <IoCaretBack />
      </button> */}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/parks">Parks</Link>
        </li>
      </ul>
      <p>Exploria</p>
    </div>
  );
};
