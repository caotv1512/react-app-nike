import React from "react";

const Activities = () => {
  return (
    <div className="p-2">
      Ideal Activities
      <div className="mt-2">
        <input type="checkbox" className="custom-checkbox" />
        <label className="ml-1">Hot Weather</label>
      </div>
      <div className="mt-2">
        <input type="checkbox" className="custom-checkbox" />
        <label className="ml-1">Hard</label>
      </div>
      <div className="mt-2">
        <input type="checkbox" className="custom-checkbox" />
        <label className="ml-1">Cold Weather</label>
      </div>
    </div>
  );
};

export default Activities;
