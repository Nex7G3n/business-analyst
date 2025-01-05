import { createContext, useContext, useState } from "react";
import { getArticles } from "../services/news.service";


const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
  const [searchData, setSearchData] = useState({
    state: "No Search"
  });

  const executeSearch = (query) => {
    if(query === "") {
      setSearchData({state: "No Search"})
    } else {
      setSearchData({state: "Searching"})

      getArticles(query).then((data) => {
        setSearchData({state: "Search Results", data: {
          articles: data
        }})
      }).catch((error) => {
        setSearchData({state: "Error", data: {
          error: error
        }})
      });
    }
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