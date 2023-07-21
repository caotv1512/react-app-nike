import React from "react";
import "./FooterCategories.scss";

const FooterCategories = () => {
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mt-20 text-center">
      <div className="col-span-1">
        <span style={{ marginLeft: '2em' }}>Shoes</span>
        <ul className="footer-categories">
          <li>All Shoes</li>
          <li>Training Shoes</li>
          <li>Crampons</li>
          <li>Running Shoes</li>
        </ul>
      </div>
      <div className="col-span-1">
        <span style={{ marginLeft: '2em' }}>Clothes</span>
        <ul className="footer-categories">
          <li>All Clothes</li>
          <li>Top</li>
          <li>Trousers & Tights</li>
          <li>Jackets</li>
        </ul>
      </div>
      <div className="col-span-1">
        <span style={{ marginLeft: '2em' }}>Kid</span>
        <ul className="footer-categories">
          <li>Kids Training Shoes</li>
          <li>Kids Backpacks</li>
          <li>Kids' Football Boots</li>
          <li>Kids Running Shoes</li>
        </ul>
      </div>
      <div className="col-span-1">
        <span style={{ marginLeft: '2em' }}>Highlights</span>
        <ul className="footer-categories">
          <li>NIKE MEMBER O</li>
          <li>Nike Run Club</li>
          <li>Nike Training Club</li>
          <li>Backpacks & Bags</li>
        </ul>
      </div>
    </div>
  );
};

export default FooterCategories;
