import React from "react";
import "./MoreNike.scss";

const MoreNike = () => {
  return (
    <div className="mt-20 mb-8">
      <span className="text-2xl">More From Nike</span>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 mt-4">
        <div className="col-span-1">
          <div className="relative">
            <img
              src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_751,c_limit/0bafb728-2ae2-416f-bb18-5935801c8071/resmi-nike-sitesi.png"
              alt="More With Nike"
            />
            <button className="button-in-photo-more">Man</button>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative">
            <img
              src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_751,c_limit/2c8754ce-6287-4e77-a198-1ad483fba257/resmi-nike-sitesi.png"
              alt="More With Nike"
            />
            <button className="button-in-photo-more">Woman</button>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative">
            <img
              src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_751,c_limit/414db494-7ebc-4d53-bbff-58d50b380a24/resmi-nike-sitesi.png"
              alt="More With Nike"
            />
            <button className="button-in-photo-more">Kid</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreNike;
