import React from "react";

const Price = () => {
  return (
    <div className="p-2 flex flex-col">
      <span>View by Price</span>
      <div className="mt-2">
        <input type="checkbox" className="custom-checkbox" />
        <label className="ml-1">179.9 $ - 329.9 $</label>
      </div>
      <div className="mt-2">
        <input type="checkbox" className="custom-checkbox" />
        <label className="ml-1">329.9 $ - 499.9 $</label>
      </div>
    </div>
  );
};

export default Price;
