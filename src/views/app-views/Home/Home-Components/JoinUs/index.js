import React from "react";
import "./JoinUs.scss";

const JoinUs = () => {
  return (
    <div className="mb-10">
      <span className="text-2xl">Join Us</span>
      <div className="image-wrapper mt-4">
        <div className="relative">
          <img
            className="hidden  lg:block"
            src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/5502766a-5870-474a-a948-98a510d6c86a/resmi-nike-sitesi.jpg"
            alt="Üyelik"
          />
          <img
            className="lg:hidden block"
            src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_437,c_limit/769a8307-ce30-4b6c-b0cb-ee7e26a89fdb/resmi-nike-sitesi.jpg"
            alt="üyelik"
          />
          <span className="text-in-photo">Your Nike Membership</span>
          <span className="text-in-photo-desc">
            Sign up and show your love with Nike By You.
          </span>
          <button className="button-in-photo">Join us</button>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
