import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../App";
import { FaPlus, FaMinus, FaRegTrashAlt } from "react-icons/fa";
import CartItem from "./CartItem";
import { useForm } from "react-hook-form";
const Cart = () => {
  const [cartData, setCartData] = useContext(CartContext);
  const [items, setItems] = useState(cartData);
  const [itemQty, setItemQty] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [submittedCoupon, setSubmittedCoupon] = useState(false);

  useEffect(() => {
    setItems(cartData);
    setIsCartEmpty(false);
    sumOfPrice();
  }, [cartData]);

  //  Item price calculation
  const sumOfPrice = () => {
    let total = 0;
    let subTotal = 0;
    if (!cartData.length) {
      setTotalPrice(0);
      setIsCartEmpty(true);
      setItemQty(0);
    }
    let itmQty = 0;
    cartData.map((item) => {
      itmQty = itmQty + item.quantity;
      total = item.price * item.quantity;
      subTotal = subTotal + total;
      setTotalPrice(subTotal);
      setItemQty(itmQty);
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
    let newData = cartData.filter((item) => item.id !== id);
    setCartData(newData);
    setItems(newData);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ coupon }) => {
    if (coupon === "less10") {
      let price = totalPrice - totalPrice * 0.1;
      setTotalPrice(Math.round(price));
    } else if (coupon === "less15") {
      let price = totalPrice - totalPrice * 0.15;
      setTotalPrice(Math.round(price));
    }
    setSubmittedCoupon(true);
  };

  return (
    <div className="md:fixed">
      <h2 className="text-2xl font-medium  text-gray-800">Cart</h2>
      <h3 className="mb-5 text-sm font-semibold  text-gray-800">
        Items ({itemQty})
      </h3>
      {!isCartEmpty && (
        <>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              handlePlusMinus={handlePlusMinus}
              deleteItem={deleteItem}
            ></CartItem>
          ))}
          <div className="flex justify-between my-2 text-lg font-medium text-center text-gray-800">
            <span>Subtotal:</span>
            <span className="mr-5">$ {totalPrice}</span>{" "}
          </div>
          {!submittedCoupon && (
            <>
              <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                <p>Use less15 for 15% or less10 for 10% discount</p>
                <input
                  className="px-3 py-2 my-1 border-b border-teal-300 placeholder-gray-500 text-blueGray-600 relative tracking-wide rounded-full bg-white text-base shadow outline-none focus:outline-none focus:shadow-outline "
                  placeholder="Coupon Code..."
                  {...register("coupon", { required: false })}
                />

                <input
                  className="ml-2 p-2 rounded-full bg-indigo-900 hover:bg-indigo-700 font-semibold text-gray-200 uppercase cursor-pointer"
                  value="Apply Coupon"
                  type="submit"
                />
                <br />
              </form>
            </>
          )}
          {submittedCoupon && (
            <div>
              <p style={{ color: "green" }}>Coupon applied successfully</p>
            </div>
          )}
          <input
            className="mr-3 mt-8 p-4  rounded-full bg-indigo-900 hover:bg-indigo-700 font-semibold w-full text-gray-200 uppercase cursor-pointer"
            value="CHECKOUT"
            type="submit"
          />
          <br />
        </>
      )}
    </div>
  );
};

export default Cart;
