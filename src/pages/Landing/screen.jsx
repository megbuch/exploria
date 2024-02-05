import "./styles.scss";
import { Carousel } from "../../components/Carousel/index";

export const Landing = (props) => {
  const { featuredParks } = props;

  return (
    <div id="Landing">
      <Carousel items={featuredParks} isLandingPage={true} />
      <h1>Exploria</h1>
    </div>
  );
};
