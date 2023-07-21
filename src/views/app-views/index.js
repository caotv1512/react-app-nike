import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./Cart";
import Help from "./Help";
import Jordan from "./Jordan";
import NikeApp from "./NikeApp";
import Register from "./Register";
import LoginForm from "./Register/Register-Components/LoginForm";
import Detail from "./Detail/Detail";
import Bill from "./Bill/index"

const Home = React.lazy(() => import("./Home"));
const Favorites = React.lazy(() => import("./Favorites"));
const CartPage = React.lazy(() => import("./Cart"));
const HelpPage = React.lazy(() => import("./Help"));
const JordanPage = React.lazy(() => import("./Jordan"));
const NikeAppPage = React.lazy(() => import("./NikeApp"));
const RegisterPage = React.lazy(() => import("./Register"));
const ManProducts = React.lazy(() => import("./ManProducts"));

const AppViews = ({ isLoad, setIsLoad }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("isLogin");
    if (id) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/home" element={<Home isLoad={isLoad} setIsLoad={setIsLoad} />} />
        <Route path="/favorites" element={<Favorites isLoad={isLoad} setIsLoad={setIsLoad} />} />
        <Route path="/cart" element={<Cart isLoad={isLoad} setIsLoad={setIsLoad} />} />
        <Route path="/help" element={<Help />} />
        <Route path="/jordan" element={<Jordan />} />
        <Route path="/nike-app" element={<NikeApp />} />
        {!isLoggedIn ? (
          <>
            <Route path="/register" element={<Register isLoad={isLoad} setIsLoad={setIsLoad} />} />
            <Route path="/login" element={<LoginForm isLoad={isLoad} setIsLoad={setIsLoad} />} />
          </>
        ) : (
          <>
            <Route path="/favorites" element={<Favorites isLoad={isLoad} setIsLoad={setIsLoad} />} />
            <Route path="/cart" element={<Cart isLoad={isLoad} setIsLoad={setIsLoad} />} />
          </>
        )}
        <Route path="/shop" element={<ManProducts />} />
        <Route path="/products/:id" element={<Detail isLoad={isLoad} setIsLoad={setIsLoad} />} />
        <Route path="*" element={<Home />} />
        <Route path="/bill" element={<Bill />}></Route>
      </Routes>
    </Suspense >
  );
};

export default AppViews;
