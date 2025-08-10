import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../service/CategoryService";
import { fetchItems } from "../service/itemService";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  

  const [auth, setAuth] = useState({
    token: null,
    role: null
  })

  const addToCart = (item) => {

    const existingItem = cartItems.find(cartItem => cartItem.name === item.name)

    if(existingItem){

      setCartItems(cartItems => {

        return cartItems.map(cartItem => cartItem.name === item.name? {...cartItem, quantity: cartItem.quantity + 1}: cartItem)
      })
    }else{
      setCartItems(cartItems => [...cartItems, {...item, quantity: 1}])
    }
  }

  const removeFromCart = (itemId) => {

    setCartItems(cartItems.filter(item => item.itemId !== itemId));
  }

  const updateQuantity = (itemId, newQuantity) => {

    setCartItems(cartItems => cartItems.map(item => {

      return item.itemId === itemId? {...item, quantity: newQuantity}: item
    }))
  }
 
  useEffect(() => {
    async function loadData() {

      if(localStorage.getItem("token") && localStorage.getItem("role")){

        setAuthData(
          localStorage.getItem("token"),
          localStorage.getItem("role")
        )
      }
      const response = await fetchCategories();
      const itemResponse = await fetchItems();

      setCategories(response.data);
      setItems(itemResponse.data);
    }

    loadData();
  }, []);

  const setAuthData = (token, role) => {

    setAuth({token, role});
  }

  const contextValue = {
    categories,
    setCategories,
    auth,
    setAuthData,
    items,
    setItems,
    addToCart,
    cartItems,
    removeFromCart,
    updateQuantity
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
