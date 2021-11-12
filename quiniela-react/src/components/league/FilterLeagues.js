import React from "react";
import { FilterLeagueItem } from "./FilterLeagueItem";
import { useSelector } from "react-redux";
import { NoDataComponent } from "../ui/NoDataComponent";

export const FilterLeagues = () => {
  const leagues = useSelector((state) => state.leagues);

  return (
    <div>
      <div className="max-h-96 mt-8 overflow-auto">
        {leagues.length <= 0 ? (
          <NoDataComponent />
        ) : (
          leagues.map((league) => (
            <FilterLeagueItem key={league.id} {...league} />
          ))
        )}
      </div>
    </div>
  );
};
