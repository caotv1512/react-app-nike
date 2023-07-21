import React from "react";

const JordanFamily = () => {
  return (
    <div className="mt-10">
      <span className="font-extrabold tracking-tight text-2xl">
        WELCOME TO THE JORDAN FAMILY
        <div className="img-wrapper mt-6 flex flex-col gap-2">
          <img
            className="md:hidden"
            src="https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/512307ac-f611-499c-aa6b-ef49d3174d8e/image.png"
            alt="img"
          />
          <img
            className="hidden md:block"
            src="https://static.nike.com/a/images/f_auto,cs_srgb/w_1920,c_limit/896130fc-9251-4406-9dde-2ac4c9f2a741/image.jpg"
            alt="jordan"
          />
          <div className="flex flex-col  mt-4 text-center justify-center  md:flex">
            <span className="text-3xl mb-2 md:text-5xl">
              THERE IS A REASON TO BE HERE
            </span>
            <span className="text-base font-thin tracking-wide md:text-lg">
              We all carry the Jordan Family DNA. Hard work, perseverance.
              <br />
              You put your mind to it with magnificence and motivation. <br /> everything
              you can do. Because there's a reason you're here.
            </span>
          </div>
        </div>
      </span>
    </div>
  );
};

export default JordanFamily;
