import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import { createContext, useState } from "react";
export const CartContext = createContext();
function App() {
  const [cartData, setCartData] = useState([]);

  return (
    <CartContext.Provider value={[cartData, setCartData]}>
      <Home />
    </CartContext.Provider>
  );
}

export default App;
