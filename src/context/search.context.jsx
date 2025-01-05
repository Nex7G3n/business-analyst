import { createContext, useContext, useState } from "react";
import { getArticles } from "../services/news.service";


const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
  const [searchData, setSearchData] = useState("");

  const executeSearch = (query) => {
    console.log("Buscando: ", query);
  };

  return (
  <SearchContext.Provider value={{searchData, executeSearch}}>
    {children}
  </SearchContext.Provider>
)};


export const useSearch = () => {
    const context = useContext(SearchContext);

    if(!context) throw new Error("Se debe utilizar context dentro de su Provider");
    
    return context;
}