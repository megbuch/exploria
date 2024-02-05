import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

export const Carousel = ({ items, isLandingPage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextItem = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(nextIndex);
  };

  const goToPreviousItem = () => {
    const previousIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(previousIndex);
  };

  const renderCarouselItem = (item, index) => {
    const imageSrc = item.images ? item.images[0].url : item.image;
    const carouselItem = (
      <div className="carousel-item" key={index}>
        {isLandingPage && (
          <div className="overlay">
            <p className="explore">Explore</p>
            <Link
              key={item.parkCode}
              to={`/parks/${item.parkCode}`}
              className="park-name"
            >
              {item.name}
            </Link>
          </div>
        )}

        <img
          src={imageSrc}
          alt={item.name}
          className="splash-image"
          style={{ height: "100%", objectFit: "cover" }}
        />
      </div>
    );

    return carouselItem;
  };

  return (
    <div id="Carousel">
      <div
        className="carousel-items"
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {items.map(renderCarouselItem)}
      </div>
      <button className="carousel-button prev" onClick={goToPreviousItem}>
        Prev
      </button>
      <button className="carousel-button next" onClick={goToNextItem}>
        Next
      </button>
    </div>
  );
};
