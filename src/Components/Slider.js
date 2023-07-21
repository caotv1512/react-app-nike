import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../views/app-views/Home/Home-Components/SliderMain/SliderMain.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios"
const SliderMain = ({ options }) => {
  const [jordan, setJordan] = useState([])
  const jor = jordan.slice(18, 25)
  const navigate = useNavigate()
  const handleClick = (id) => {
    navigate(`/products/${id}`)
  }
  useEffect(() => {
    axios.get("https://db-nike.onrender.com/products").then((res) => setJordan(res.data))
  }, [jordan])
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
        <span className="font-extrabold text-sm md:text-2xl">
          Hot
        </span>
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
        {jor.map((e, index) => (
          <div className="hover:opacity-70 duration-300 cursor-pointer" key={index}>
            <div key={e.Id} className="">
              <img src={e.Image} alt={e.Desc} onClick={() => handleClick(e.id)} />
              <div className="image-description mt-4 flex flex-col">
                <div className="flex justify-between">
                  <span className="font-bold tracking-tight text-sm md:text-base">
                    {e.Title}
                  </span>
                  <span className="mr-10 font-bold tracking-tight">
                    {e.Price}$
                  </span>
                </div>

                <span className="opacity-50 font-bold text-sm tracking-tighter">
                  {e.Desc}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderMain;
