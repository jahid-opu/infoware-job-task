import React, { useState } from "react";
import { FaPlus, FaMinus, FaRegTrashAlt } from "react-icons/fa";

const CartItem = ({ item, handlePlusMinus, deleteItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const plus = (id) => {
    setQuantity(quantity + 1);
    handlePlusMinus(id, quantity + 1);
  };

  const minus = (id) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      handlePlusMinus(id, quantity - 1);
    }
  };
  return (
    <div className="bg-white border-b mr-3 px-3 py-4 md:p-2">
      <div className="grid grid-cols-4">
        <div>
          <h4>{item.name}</h4>
        </div>

        <div className="col-span-2 flex ml-5 content-center">
          <div className="flex-1 flex flex-wrap items-end justify-between content-center text-sm">
            <div className="border px-2 py-1 border-gray-400 rounded">
              <button onClick={() => plus(item.id)} className="md:mr-4">
                <FaPlus className="cursor-pointer" size=".8rem" color="black" />
              </button>
              <input
                className="mx-2 text-center w-4 font-medium text-gray-800"
                type="text"
                value={quantity}
                readOnly
              />
              <button onClick={() => minus(item.id)} className="lg:ml-4">
                <FaMinus
                  className="cursor-pointer"
                  size=".8rem"
                  color="black"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between flex-wrap content-center">
          <button onClick={() => deleteItem(item.id)}>
            <FaRegTrashAlt
              className="cursor-pointer"
              size="1.4rem"
              color="gray"
            />
          </button>
          <h4>$ {item.price * quantity}</h4>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
