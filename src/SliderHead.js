import React from 'react';
import Slider from 'react-slick';
import './SliderHead.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Importa las imágenes
import image1 from './images/slider1.jpg';
import image2 from './images/slider2.jpg';
import image3 from './images/slider3.jpg';
import image4 from './images/slider4.jpg';
import image5 from './images/slider5.jpg';
import image6 from './images/slider6.jpg';

function SliderHead() {  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <>
      <div className="container hidden-1024">
        <div className="images">
          <div className="img-container">
            <img src={image1} alt="Image 1" />
            <div className="overlay">M</div>
          </div>
          <div className="img-container">
            <img src={image2} alt="Image 2" />
            <div className="overlay">A</div>
          </div>
          <div className="img-container">
            <img src={image3} alt="Image 3" />
            <div className="overlay">B</div>
          </div>
          <div className="img-container">
            <img src={image4} alt="Image 4" />
            <div className="overlay">A</div>
          </div>
          <div className="img-container">
            <img src={image5} alt="Image 5" />
            <div className="overlay">S</div>
          </div>
          <div className="img-container">
            <img src={image6} alt="Image 6" />
            <div className="overlay">A</div>
          </div>
        </div>
      </div>
      <div className="slider-container visible-xs">
        <Slider {...settings}>
          <div className="img-container-xs">
            <img src={image1} alt="Image 1" />
          </div>
          <div className="img-container-xs">
            <img src={image2} alt="Image 2" />
          </div>
          <div className="img-container-xs">
            <img src={image3} alt="Image 3" />
          </div>
          <div className="img-container-xs">
            <img src={image4} alt="Image 4" />
          </div>
          <div className="img-container-xs">
            <img src={image5} alt="Image 5" />
          </div>
          <div className="img-container-xs">
            <img src={image6} alt="Image 6" />
          </div>
        </Slider>
      </div>
    </>
  );
}

export default SliderHead;