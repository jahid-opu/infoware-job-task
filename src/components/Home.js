import React from "react";
import Cart from "./Cart";
import Items from "./Items";
import LeftBar from "./LeftBar";

const Home = () => {
  return (
    <div className="md:grid grid-cols-12">
      <div className="p-5 relative col-span-3">
        <LeftBar />
      </div>

      <div className="p-5 md:border-r md:border-l col-span-5">
        <Items />
      </div>

      <div className="p-5 relative col-span-4 ">
        <Cart />
      </div>
    </div>
  );
};

export default Home;
