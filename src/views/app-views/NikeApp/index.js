import React from "react";
import Maintain from "./NikeApp-Components/Maintain";
import MoreApps from "./NikeApp-Components/MoreApps";
import ScanCode from "./NikeApp-Components/ScanCode";

const NikeApp = () => {
  const NikeAppConfig = [
    {
      Id: 1,
      Image:
        "https://cf-images.us-east-1.prod.boltdns.net/v1/static/72451143001/41f326e8-bdfa-49a9-a9ac-a11c00216b44/34720a02-22c8-479b-8255-a3af712b2de4/1808x700/match/image.jpg",
      MiniImage:
        "https://cf-images.us-east-1.prod.boltdns.net/v1/static/72451143001/2992b6e6-df6f-4d19-8e2e-5c046c9a9405/f5624d3f-4248-4ccb-8819-3545e52d762a/1808x700/match/image.jpg",
      Title: "Your Personal Nike Guide",
      Desc: "The Nike App offers everything you need to get moving. This includes the latest styles, intriguing stories and a worldwide community. It's all here, personalized for you.",
    },
    {
      Id: 2,
      Image:
        "https://cf-images.us-east-1.prod.boltdns.net/v1/jit/72451143001/08160145-739e-4959-81e3-d29795f403c3/main/1808x700/11s40ms/match/image.jpg",
      MiniImage:
        "https://cf-images.us-east-1.prod.boltdns.net/v1/jit/72451143001/7ea662ae-ab02-43fc-88f2-53f951f38e3a/main/748x1000/6s733ms/match/image.jpg",
      Title: "Join the Community",
      Desc: "You will become a Nike Member when you enter the app. You'll have access to one-of-a-kind Member experiences, along with priority and exclusive access to the latest shoes and apparel.",
    },
    {
      Id: 3,
      Image:
        "https://cf-images.us-east-1.prod.boltdns.net/v1/jit/72451143001/2d5ba934-44c0-412e-a794-a8464377f9b7/main/1808x700/5s333ms/match/image.jpg",
      MiniImage:
        "https://cf-images.us-east-1.prod.boltdns.net/v1/jit/72451143001/e07a0628-14c5-4dd0-ad20-2ca49aeb225e/main/748x1000/5s386ms/match/image.jpg",
      Title: "Review Easier",
      Desc: "Get product recommendations based on the products you love, and benefit from free shipping and fast and secure payment for purchases of 1600 TL or more. We offer returns within 60 days. You will not regret it.",
    },
    {
      Id: 4,
      Image:
        "https://static.nike.com/a/images/f_auto/dpr_3.0,cs_srgb/h_500,c_limit/417ce94e-f601-4bf5-86df-1370e24610bb/nike-snkrs-uygulaması.png",
      MiniImage:
        "https://cf-images.us-east-1.prod.boltdns.net/v1/jit/72451143001/92f1e560-4f9d-4f65-9a7a-99bc97506c1b/main/748x1000/4s533ms/match/image.jpg",
      Title: "Comprehensive Content",
      Desc: "Nike App delivers comprehensive content every day. Stay up to date with practical advice and stories on everything from Nike pros to neighborhood teams.",
    },
  ];
  return (
    <div>
      <Maintain options={NikeAppConfig} />
      <ScanCode />
      <MoreApps />
    </div>
  );
};

export default NikeApp;
