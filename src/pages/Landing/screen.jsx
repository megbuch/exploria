import "./styles.scss";
import { Carousel } from "../../components/Carousel/index";

export const Landing = (props) => {
  const { featuredParks } = props;

  return (
    <div id="Landing">
      <Carousel items={featuredParks} overlay={true} />
    </div>
  );
};
