import React from "react";

const Kid = () => {
  return (
    <div className="p-2">
      <span>Kid</span>
      <div className="mt-2 flex items-center">
        <input type="checkbox" className="custom-checkbox" />
        <label className="ml-1">Boy</label>
      </div>
      <div className="mt-2 flex items-center">
        <input type="checkbox" className="custom-checkbox" />
        <label className="ml-1">Girl</label>
      </div>
    </div>
  );
};

export default Kid;
