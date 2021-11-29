import React from "react";
import { useForm } from "../../hooks/useForm";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { SearchIcon } from "../ui/Icons/SearchIcon";

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
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
