import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../service/CategoryService";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function loadData() {
      const response = await fetchCategories();

      setCategories(response.data);
    }

    loadData();
  }, []);

  const contextValue = {
    categories,
    setCategories,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
