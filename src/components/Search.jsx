import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/context/search.context";
import { useState } from "react";

export const Search = () => {
  const [ query, setQuery ] = useState("");
  const { executeSearch } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    executeSearch(query);
  };

  return (
    <form
      className="flex w-full items-center justify-center space-x-4"
      onSubmit={handleSubmit}
    >
      <div className="relative w-full max-w-lg">
        <Input
          type="text"
          placeholder="Introduce un término o símbolo..."
          className="w-full rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 16l-4-4m0 0l4-4m-4 4h16"
            />
          </svg>
        </div>
      </div>

      <Button
        type="submit"
        className="px-6 py-3 text-white rounded-md flex items-center bg-gradient-to-r from-blue-500 to-green-500 shadow-md hover:scale-110"
      >
        <svg
          className="w-5 h-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
        Buscar
      </Button>
    </form>
  );
};
