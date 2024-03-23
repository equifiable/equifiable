import React from "react";
import TopMenu from "./TopMenu";
import Header from "./Header";
import PricingBox from "./PricingBox";
import Footer from "./Footer";
import "./pricing.css";

const PricingBox = () => {
  return (
    <>
      <TopMenu />
      <Header
        title="Pricing"
        description="Quickly build an effective pricing table for your potential customers with this Bootstrap example. It’s built with default Bootstrap components and utilities with little customization."
      />

      <div className="container">
        <PricingBox />
        <Footer />
      </div>
    </>
  );
};

export default PricingBox;