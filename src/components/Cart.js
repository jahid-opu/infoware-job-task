import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../App";
import { FaPlus, FaMinus, FaRegTrashAlt } from "react-icons/fa";
import CartItem from "./CartItem";
const Cart = () => {
  const [cartData, setCartData] = useContext(CartContext);
  const [items, setItems] = useState(cartData);

  console.log(cartData.length);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setItems(cartData);
    sumOfPrice();
    console.log(totalPrice);
  }, [cartData]);

  //  Item price calculation
  const sumOfPrice = () => {
    let total = 0;
    let subTotal = 0;
    if (!cartData.length) {
      setTotalPrice(0);
      // setShippingPrice(0);
      // setIsCartEmpty(true);
    }
    cartData.map((item) => {
      total = item.price * item.quantity;
      subTotal = subTotal + total;
      setTotalPrice(subTotal);
    });
  };

  // Handle Cart Items quantity with plus minus icon
  const handlePlusMinus = (id, quantity) => {
    let newCart;
    cartData.map((item, index) => {
      if (id === item.id) {
        newCart = { ...item, quantity: quantity };
        cartData[index] = newCart;
        sumOfPrice();
      }
    });
  };

  // Delete items from cart
  const deleteItem = (id) => {
    let newData = cartData.filter((item) => item.id != id);
    setCartData(newData);
    setItems(newData);
  };

  return (
    <div className="md:fixed">
      <h3>Items</h3>
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          handlePlusMinus={handlePlusMinus}
          deleteItem={deleteItem}
        ></CartItem>
      ))}
      <h3>Price: {totalPrice}</h3>
    </div>
  );
};

export default Cart;
