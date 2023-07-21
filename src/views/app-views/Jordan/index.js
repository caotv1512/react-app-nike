import SliderMain from "Components/Slider";
import React, { useEffect, useState } from "react";
import Background from "./Jordan-Components/Background";
import JordanCategories from "./Jordan-Components/JordanCategories";
import JordanFamily from "./Jordan-Components/JordanFamily";
import Main from "./Jordan-Components/Main";
import OtherJordan from "./Jordan-Components/OtherJordan";
import axios from 'axios'
const Jordan = () => {
  const [sliderJordan, setSliderJordan] = useState([])
  useEffect(() => {
    axios.get("https://db-nike.onrender.com/products").then((res) => setSliderJordan(res.data))
  }, [setSliderJordan])
  const subArr = sliderJordan.slice(31, 37)
  const JordanCategoriess = [
    {
      Id: 1,
      Title: "JORDAN WOMAN",
      MiniImage:
        "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_437,c_limit/38303aea-607e-4abf-b0aa-a28a54cff726/jordan-markas%C4%B1.jpg",
      MainImage:
        "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_2433,c_limit/41eb67d4-7d0c-415b-b370-541433b4afcd/jordan-markası.jpg",
      MainTitle: "FLIGHT",
      Model: "(HER)ITAGE COLLECTION",
      Desc: "Relax and feel confident with its strong design lines and patterns reflecting its basketball heritage.",
    },
    {
      Id: 2,
      Title: "JORDAN MEN",
      MiniImage:
        "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_437,c_limit/4a753d0f-88fd-43ae-be50-f7c3aca7bd96/jordan-markas%C4%B1.jpg",
      MainImage:
        "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_2433,c_limit/f70b5088-5a57-45e7-b051-7dd03ca13c95/jordan-markası.jpg",
      MainTitle: "JORDAN 23",
      Model: "ENGINEERED",
      Desc: "Get ready to dominate the city in new, tailored Jordan styles designed with our planet in mind.",
    },
    {
      Id: 3,
      Title: "JORDAN KIDS",
      MiniImage:
        "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_437,c_limit/4bab22ea-ccc0-4fcf-8ac1-82076405ed73/jordan-markas%C4%B1.jpg",
      MainImage:
        "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_2433,c_limit/c9fce1d7-62cc-4d75-af64-43a8124596e2/jordan-markası.jpg",
      MainTitle: "TEMEL JORDAN",
      Model: "FLEECE STYLES",
      Desc: "Comfortable cuts suitable for daily use.",
    },
  ];
  useEffect(() => {
    document.title = "Jordan Brand. Nike UK";
  }, []);
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <img
          className="w-24 mt-4"
          src="https://www.nike.com/assets/experience/ciclp/landing-pages/static/v2/214-bc54691f7cf/static/icons/jordan.svg"
          alt="Jordan"
        />
        <Main />
      </div>
      <div className="flex flex-col text-left my-8">
        <SliderMain options={subArr} />
      </div>
      <Background />
      <JordanCategories options={JordanCategoriess} />
      <JordanFamily />
      <OtherJordan />
    </div>
  );
};

export default Jordan;
