import React from "react";
import Cart from "./Cart";
import Items from "./Items";
import LeftBar from "./LeftBar";

const Home = () => {
  return (
    <div className="md:grid grid-cols-10">
      <div className="p-5 relative col-span-3 bg-gray-500">
        <LeftBar />
      </div>

      <div className="p-5 col-span-4">
        <Items />
      </div>

      <div className="p-5 relative col-span-3 ">
        <Cart />
      </div>
    </div>
  );
};

export default Home;
