import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "layout/app-layout";
import SignInSide from "Admin/Login/Login";
import Dashboard from "Admin/Layout/Dashboard";
import Deposits from "Admin/Layout/Deposits";
import Orders from "Admin/Layout/Order";
import Chart from "Admin/Layout/Chart";
import User from "Admin/Layout/User";
import Index from "Admin/IndexAdmin";
import Shop from "Admin/Layout/Shop";
const Views = () => {
  const isLogin = localStorage.getItem('admin')
  return (
    <Routes>
      {isLogin && isLogin == 'true' ? (
        <Route path="/admin" element={<Index></Index>}>
          <Route index element={<Dashboard ></Dashboard>}></Route>
          <Route path="shop" element={<Shop />}></Route>
          <Route path="user" element={<User />}></Route>
          <Route path="chart" element={<Chart />}></Route>
          <Route path="order" element={<Orders />}></Route>
          <Route path="deposits" element={<Deposits />}></Route>
        </Route>
      ) : (
        <Route path="/adminlogin" element={<SignInSide></SignInSide>}></Route>
      )}
      <Route path="/*" element={<AppLayout />}></Route>
    </Routes>
  );
};

export default Views;
