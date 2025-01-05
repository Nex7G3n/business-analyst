import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';
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
      setSearchData({state: "Loading"})
      console.log("Searching for: ", query)

      getArticles(query).then((data) => {
        setSearchData({state: "Ok", data: {
          articles: data
        }})
        console.log("Data: ", data)
      }).catch((error) => {
        setSearchData({state: "Error", data: {
          error: error
        }})
        console.log("Error: ", error)
      });
    }
  };

  return (
  <SearchContext.Provider value={{searchData, executeSearch}}>
    {children}
  </SearchContext.Provider>
)};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSearch = () => {
    const context = useContext(SearchContext);

    if(!context) throw new Error("Se debe utilizar context dentro de su Provider");
    
    return context;
}