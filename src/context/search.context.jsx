import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { getArticles } from "../services/news.service";
import { getActions } from "@/services/financial.service";

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
      const actions = await getActions(query);

      await setSearchData({ state: "Ok", data: {
        articles: articles,
        actions: actions,
      } });

      console.log("articles", articles);
      console.log("actions", actions);

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
