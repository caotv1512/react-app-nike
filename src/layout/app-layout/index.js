import React, { useState } from "react";
import AppViews from "views/app-views";
import Footer from "views/app-views/Footer";
import Navbar from "views/app-views/Navbar";
import SwiperNotification from "views/app-views/Home/Home-Components/SwiperNotification";
import TopHeader from "views/app-views/Home/Home-Components/TopHeader";


const AppLayout = () => {
  const [isLoad, setIsLoad] = useState(true)
  return (
    <div>
      <TopHeader isLoad={isLoad} setIsLoad={setIsLoad} />
      <Navbar isLoad={isLoad} setIsLoad={setIsLoad} />
      <SwiperNotification />
      <div className="mx-10 min-h-[45vh]">
        <AppViews isLoad={isLoad} setIsLoad={setIsLoad} />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
