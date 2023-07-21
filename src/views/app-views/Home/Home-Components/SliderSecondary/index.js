import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderSecondary.scss";
import axios from "axios"
import { useNavigate } from "react-router-dom";
const SliderSecondary = () => {
  const [snkr, setSnkr] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    axios.get("https://db-nike.onrender.com/products").then((res) => setSnkr(res.data))
  }, [setSnkr])
  const handleClick = (id) => {
    navigate(`/products/${id}`)
  }
  const sub = snkr.slice(10, 15)
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
        <span className="text-2xl">Latest on SNKRS</span>
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
        {sub.map((sub, index) => (
          <div className="hover:opacity-70 duration-300 cursor-pointer" key={index}>
            <img
              src={sub.Image}
              alt="SNKR"
              onClick={() => handleClick(sub.id)}
            />
            <div className="image-description mt-4 flex flex-col">
              <span className="text-red-500">SNKRS Special</span>
              <div className="flex flex-col">
                <span>{sub.Title}</span>
                <span className="opacity-50">{sub.Desc}</span>
                <span className="mr-10">{sub.Price}$</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderSecondary;
