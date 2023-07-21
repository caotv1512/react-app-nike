import React from "react";
import GridHelpNav from "./GridHelpNav";
import HelpContainerHeader from "./HelpContainerHeader";

const HelpContainer = () => {
  const gridCargo = [
    {
      Id: 1,
      Title: "CARGO AND DELIVERY",
    },
    {
      Id: 2,
      Title: "How Can I Get Free Shipping on Nike Orders?",
    },
    {
      Id: 3,
      Title: "What Are Nike's Delivery Options?",
    },
    {
      Id: 4,
      Title: "Is My Nike Order Eligible for International Shipping?",
    },
  ];
  const gridRefunds = [
    {
      Id: 1,
      Title: "RETURNS",
    },
    {
      Id: 2,
      Title: "How do I return my Nike order?",
    },
    {
      Id: 3,
      Title: "What is Nike's return policy?",
    },
    {
      Id: 4,
      Title: "Where is my refund?",
    },
  ];
  const gridAccounts = [
    {
      Id: 1,
      Title: "NIKE MEMBERSHIPS",
    },
    {
      Id: 2,
      Title: "What is a Nike Membership?",
    },
    {
      Id: 3,
      Title: "How do I create a Nike Member Profile?",
    },
    {
      Id: 4,
      Title:
        "How can I make the most efficient use of NRC and NTC applications?",
    },
  ];
  const gridOrders = [
    {
      Id: 1,
      Title: "ORDERS",
    },
    {
      Id: 2,
      Title: "How do I track the status of my Nike order?",
    },
    {
      Id: 3,
      Title: "Can I cancel or change my Nike order?",
    },
    {
      Id: 4,
      Title: "What Payment Options Can I Use For Nike Orders?",
    },
  ];
  const gridProducts = [
    {
      Id: 1,
      Title: "PRODUCT INFORMATION",
    },
    {
      Id: 2,
      Title: "How can I get Nike's latest sneakers?",
    },
    {
      Id: 3,
      Title: "How do I find the right size/size and fit?",
    },
    {
      Id: 4,
      Title: "What is Nike By You's personalization policy?",
    },
    {
      Id: 5,
      Title: "Do Nike shoes have a warranty?",
    },
  ];
  const gridCorporation = [
    {
      Id: 1,
      Title: "INSTITUTIONAL ",
    },
    {
      Id: 2,
      Title: "Nike, Inc. Where can I find more information about it?",
    },
    {
      Id: 3,
      Title: "Where is the nearest Nike store to me?",
    },
  ];
  return (
    <div className="border p-6 mt-4 w-full h-full md:p-16">
      <HelpContainerHeader />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GridHelpNav
          gridCargo={gridCargo}
          gridRefunds={gridRefunds}
          gridAccounts={gridAccounts}
          gridOrders={gridOrders}
          gridProducts={gridProducts}
          gridCorporation={gridCorporation}
        />
      </div>
    </div>
  );
};

export default HelpContainer;
