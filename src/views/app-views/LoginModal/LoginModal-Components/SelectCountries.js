import React from "react";
import "../LoginModal.scss";

const SelectCountries = () => {
  return (
    <div className="w-full relative flex">
      <i class="fa-solid fa-caret-down absolute top-1/2 right-3 text-gray-400"></i>
      <select className="w-full" id="country" name="country">
        <option value="Vietnam">Vietnam</option>
      </select>
    </div>
  );
};

export default SelectCountries;
