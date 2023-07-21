import React from "react";
import "../NikeApp.scss";

const ScanCode = () => {
  return (
    <div className="scan-code-main">
      <img
        className="md:block hidden"
        src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/a9877611-07b3-4c5a-a106-b8dd407e884b/nike-app.jpg"
        alt="scancode"
      />
      <span className="main-text">Scan the code to download the app.</span>

      <button className="mobile-download-button">Download</button>
    </div>
  );
};

export default ScanCode;
