import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

export const Carousel = ({ items, overlay }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToItem = (index) => {
    setCurrentIndex(index);
  };

  const goToNextItem = () => {
    setCurrentIndex((currentIndex) => (currentIndex + 1) % items.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextItem();
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div id="Carousel">
      <div
        className="carousel-items"
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {items.map((item, index) => (
          <div className="carousel-item" key={index}>
            {overlay && (
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
            <div className="image-container">
              <img
                // API image sources come from the URL.
                // We use the image directly for the landing page.
                src={item.images ? item.images[0].url : item.image}
                alt={item.name}
                style={{ height: "100%", objectFit: "cover" }}
              />
              <div className="overlay"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="indicators-container">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => goToItem(index)}
            className={`indicator ${index === currentIndex && "active"}`}
          ></div>
        ))}
      </div>
    </div>
  );
};
