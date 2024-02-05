import "./styles.scss";

export const Landing = (props) => {
  const { loading, featuredParks } = props;
  if (loading) return <p>Loading...</p>;

  return (
    <div id="Landing">
      <h1>Exploria</h1>
      {featuredParks.map((park) => {
        return (
          <img
            className="featured-image"
            key={park.id}
            src={park.images[0].url}
          />
        );
      })}
    </div>
  );
};
