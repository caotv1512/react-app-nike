import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderMain.scss";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const SliderMain = () => {
  const [nike, setNike] = useState([])
  const navigate = useNavigate()
  const handleClick = (id) => {
    navigate(`/products/${id}`)
  }
  useEffect(() => {
    axios.get("https://db-nike.onrender.com/products").then((res) => setNike(res.data))
  }, [setNike])
  const sub = nike.slice(1, 6)
  const sliderRef = useRef();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="mb-20">
      <div className="flex justify-between items-end mr-10 mb-3">
        <span className="text-2xl">Ready</span>
        <div className="Slider-Buttons">
          <button
            onClick={() => {
              sliderRef.current.slickPrev();
            }}
          >
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <button
            onClick={() => {
              sliderRef.current.slickNext();
            }}
          >
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <Slider ref={sliderRef} {...settings}>
        {sub.map((nike, index) => (
          <div className="hover:opacity-70 duration-300 cursor-pointer" key={index}>
            <img
              src={nike.Image}
              alt="Nike"
              onClick={() => handleClick(nike.id)}
            />
            <div className="image-description mt-4 flex flex-col">
              <div className="flex justify-between">
                <span>{nike.Title}</span>
                <span className="mr-10 ">{nike.Price}$</span>
              </div>

              <span className="opacity-50">{nike.Desc}</span>
            </div>
          </div>
        ))}

      </Slider>
    </div>
  );
};

export default SliderMain;
