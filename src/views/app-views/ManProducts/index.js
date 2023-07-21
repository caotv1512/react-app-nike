import React, { useEffect, useState } from "react";
import Activities from "./ManProducts-Components/Activities";
import Brands from "./ManProducts-Components/Brands";
import Card from "./ManProducts-Components/Card";
import Colors from "./ManProducts-Components/Colors";
import Design from "./ManProducts-Components/Design";
import Gender from "./ManProducts-Components/Gender";
import HeadText from "./ManProducts-Components/HeadText";
import Icons from "./ManProducts-Components/Icons";
import Kid from "./ManProducts-Components/Kid";
import List from "./ManProducts-Components/List";
import NBA from "./ManProducts-Components/NBA";
import Partner from "./ManProducts-Components/Partner";
import Price from "./ManProducts-Components/Price";
import Spor from "./ManProducts-Components/Spor";
import "./Products.scss";
import axios from "axios"

const ManProducts = () => {
  
  const [cardData, setCardData] = useState([])
  useEffect(() => {
    document.title = "Nike Shop"
    axios.get("https://db-nike.onrender.com/products").then((res) => setCardData(res.data))
  }, [setCardData]);

  return (
    <div className="mt-4">
      <HeadText />
      <div className="md:grid md:grid-cols-12">
        <div className="md:mt-4 md:w-52 md:max-h-screen md:min-h-[50vh] md:overflow-scroll md:overflow-x-hidden md:col-span-2 md:sticky md:top-10 hidden md:block">
          <List />
          <hr className="mt-4" />
          <Gender />
          <hr className="mt-4" />
          <Kid />
          <hr className="mt-4" />
          <Price />
          <hr className="mt-4" />
          <Spor />
          <hr className="mt-4" />
          <Colors />
          <hr className="mt-4" />
          <Brands />
          <hr className="mt-4" />
          <Icons />
          <hr className="mt-4" />
          <Design />
          <hr className="mt-4" />
          <Activities />
          <hr className="mt-4" />
          <Partner />
          <hr className="mt-4" />
          <NBA />
        </div>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-4 col-span-10 h-full  ">
          <Card options={cardData} />
        </div>
      </div>
    </div>
  );
};

export default ManProducts;
