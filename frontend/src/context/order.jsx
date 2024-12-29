import React, { createContext, useState, useEffect, useContext } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(() => {
    // Load initial state from localStorage
    const storedOrder = localStorage.getItem("order");
    return storedOrder ? JSON.parse(storedOrder) : {};
  });

  const updateOrder = (category, selection) => {
    setOrder((prevOrder) => {
      const updatedOrder = { ...prevOrder, [category]: selection };
      // Save updated order to localStorage
      localStorage.setItem("order", JSON.stringify(updatedOrder));
      return updatedOrder;
    });
  };
  const[address,setAddress]=useState(null);
  useEffect(() => {
    // Save order state to localStorage whenever it changes
    localStorage.setItem("order", JSON.stringify(order));
  }, [order]);

  return (
    <OrderContext.Provider value={{ order, updateOrder , setOrder , address , setAddress}}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
