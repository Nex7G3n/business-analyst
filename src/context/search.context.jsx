import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { getArticles } from "../services/news.service";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchData, setSearchData] = useState({
    state: "No Search",
  });

  const executeSearch = async (query) => {
    if (query === "") {
      setSearchData({ state: "No Search" });
      return;
    }
    setSearchData({ state: "Loading" });
    try {
      const articles = await getArticles(query);
      setSearchData({ state: "Loaded", data: {
        articles: articles,
      } });
    } catch (error) {
      setSearchData({ state: "Error", error: error.message });
    }
  };

  return (
    <SearchContext.Provider value={{ searchData, executeSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context)
    throw new Error("Se debe utilizar context dentro de su Provider");

  return context;
};
