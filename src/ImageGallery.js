import React, { useState } from "react";
import "./ImageGallery.css";

// Importa las imágenes
import image1 from "./images/img1.jpg";
import image2 from "./images/img2.jpg";
import image3 from "./images/img3.jpg";
import image4 from "./images/img4.jpg";
import image5 from "./images/img5.jpg";
import image6 from "./images/img6.jpg";
import image7 from "./images/img7.jpg";
import image8 from "./images/img8.jpg";
import image9 from "./images/img9.jpg";
import image10 from "./images/img10.jpg";
import image11 from "./images/img11.jpg";
import image12 from "./images/img12.jpg";
import image13 from "./images/img13.jpg";
import image14 from "./images/img14.jpg";
import image15 from "./images/img15.png";

const ImageGallery = () => {
  const [currentGallery, setCurrentGallery] = useState(1);

  const showGallery = (direction) => {
    if (direction === "next" && currentGallery === 1) {
      setCurrentGallery(2);
    } else if (direction === "prev" && currentGallery === 2) {
      setCurrentGallery(1);
    }
  };

  return (
    <div className="gallery-wrapper">
      <div
        className={`container-img ${currentGallery === 1 ? "" : "hidden"}`}
        id="gallery1"
      >
        <div className="box-img">
          <a href="#">
            <figure>
              <img src={image1} alt="img-galeria" />
            </figure>
          </a>
        </div>
        <div className="box-img">
          <a href="#">
            <figure>
              <img src={image2} alt="img-galeria" />
            </figure>
          </a>
        </div>
        <div className="box-img">
          <a href="#">
            <figure>
              <img src={image3} alt="img-galeria" />
            </figure>
          </a>
        </div>
        <div className="box-img">
          <a href="#">
            <figure>
              <img src={image4} alt="img-galeria" />
            </figure>
          </a>
        </div>
        <div className="box-img">
          <a href="#">
            <figure>
              <img src={image5} alt="img-galeria" />
            </figure>
          </a>
        </div>
        <div className="box-img">
          <a href="#">
            <figure>
              <img src={image6} alt="img-galeria" />
            </figure>
          </a>
        </div>
        <div className="box-img">
          <a href="#">
            <figure>
              <img src={image7} alt="img-galeria" />
            </figure>
          </a>
        </div>
      </div>
      <div
        className={`container-img ${currentGallery === 2 ? "" : "hidden"}`}
        id="gallery2"
      >
        <div className="box-img">
          <a href="#">
            <figure>
              <img src={image8} alt="img-galeria" />
            </figure>
          </a>
        </div>
        <div className="box-img">
          <a href="#">
            <figure>
              <img src={image9} alt="img-galeria" />
            </figure>
          </a>
        </div>
        <div className="box-img">
          <a href="#">
            <figure>
              <img src={image10} alt="img-galeria" />
            </figure>
          </a>
        </div>
        <div className="box-img">
          <a href="#">
            <figure>
              <img src={image11} alt="img-galeria" />
            </figure>
          </a>
        </div>
        <div className="box-img">
          <a href="#">
            <figure>
              <img src={image12} alt="img-galeria" />
            </figure>
          </a>
        </div>
        <div className="box-img">
          <a href="#">
            <figure>
              <img src={image13} alt="img-galeria" />
            </figure>
          </a>
        </div>
        <div className="box-img">
          <a href="#">
            <figure>
              <img src={image14} alt="img-galeria" />
            </figure>
          </a>
        </div>
        <div className="box-img">
          <a href="#">
            <figure>
              <img src={image15} alt="img-galeria" />
            </figure>
          </a>
        </div>
      </div>
      <div className="nav-arrow left-arrow" onClick={() => showGallery("prev")}>
        &#9664;
      </div>
      <div
        className="nav-arrow right-arrow"
        onClick={() => showGallery("next")}
      >
        &#9654;
      </div>
    </div>
  );
};

export default ImageGallery;
