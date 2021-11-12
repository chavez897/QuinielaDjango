import React from "react";
import { useForm } from "../../hooks/useForm";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";

export const LeagueSearchBar = () => {
  const location = useLocation();
  const history = useHistory();
  const { q = "" } = queryString.parse(location.search);
  const [formValues, handleInputChange] = useForm({
    searchText: q,
  });
  const { searchText } = formValues;
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = () => {
    history.push(`?q=${searchText}`);
  };
  return (
    <div className="mt-8 w-full px-4">
      <div className="flex items-center justify-center">
        <div className="flex border-2 rounded w-full">
          <input
            type="text"
            className="px-4 py-2 w-full"
            placeholder="Search..."
            onKeyPress={handleKeyPress}
            name="searchText"
            autoComplete="off"
            value={searchText}
            onChange={handleInputChange}
          />
          <button
            onClick={handleSearch}
            className="flex items-center justify-center px-4 border-l"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
