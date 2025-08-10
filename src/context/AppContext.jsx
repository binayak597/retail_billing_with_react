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
    setItems
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
