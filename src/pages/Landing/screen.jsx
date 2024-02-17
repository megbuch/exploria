import "./styles.scss";
import { Carousel } from "../../components/Carousel/index";

export const Landing = (props) => {
  const { featuredParks } = props;

  return (
    <>
      <Carousel items={featuredParks} overlay={true} />
      <div id="Landing" className="page-content">
        <div className="surface-ctr">
          <h1>Welcome to Exploria</h1>
          <h2>Sollicitudin tempor id eu nisl nunc.</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            aenean vel elit scelerisque mauris pellentesque pulvinar
            pellentesque habitant. Ornare quam viverra orci sagittis eu
            volutpat. Neque vitae tempus quam pellentesque nec nam. Proin
            sagittis nisl rhoncus mattis. Risus in hendrerit gravida rutrum
            quisque non tellus orci ac. Lorem ipsum dolor sit amet consectetur
            adipiscing elit. Congue eu consequat ac felis donec et. Augue neque
            gravida in fermentum et sollicitudin ac orci. Vitae elementum
            curabitur vitae nunc sed velit. Congue eu consequat ac felis donec
            et odio. In mollis nunc sed id.
          </p>
        </div>
      </div>
    </>
  );
};
