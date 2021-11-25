import React, { useContext } from "react";
import { CartContext } from "../App";
import { items } from "./fakeData";
const Items = () => {
  const [cartData, setCartData] = useContext(CartContext);
  const handleBuy = (singleItem) => {
    console.log(singleItem.id);
    let isAdded = false;
    if (cartData.length === 0) {
      singleItem = { ...singleItem, quantity: 1 };
      setCartData([...cartData, singleItem]);
    }
    cartData.map((item) => {
      if (item.id === singleItem.id) {
        isAdded = true;
      }
    });
    if (!isAdded) {
      singleItem = { ...singleItem, quantity: 1 };
      setCartData([...cartData, singleItem]);
    }
  };

  return (
    <div>
      <h3>Items...</h3>
      {items.map((item, index) => (
        <div key={index} className="flex justify-around py-5 border-b">
          <div className="w-2/3">
            <h3 className="font-bold">{item.name}</h3>
            <h5 className="font-medium my-3">$ {item.price}</h5>
            <p className="text-sm text-gray-500 my-3">{item.detail}</p>
          </div>
          <div className="relative">
            <img
              src={item.img}
              style={{ width: "130px", height: "80px", borderRadius: "10px" }}
              alt=""
            />
            <button
              onClick={() => handleBuy(item)}
              className="absolute -mt-5 ml-5 bg-indigo-900 hover:bg-indigo-700 text-sm text-white py-1 px-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Items;
