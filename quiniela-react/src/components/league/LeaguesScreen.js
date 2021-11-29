import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { LeagueSearchBar } from "./LeagueSearchBar";
import { FilterLeagues } from "./FilterLeagues";
import { useDispatch } from "react-redux";
import { searchLeagues } from "../../actions/leagues";
import { LoadingComponent } from "../ui/LoadingComponent";
import { NewLeagueModal } from "./NewLeagueModal";
import { AddIcon } from "../ui/Icons/AddIcon";

export const LeaguesScreen = () => {
  const [loading, setLoading] = useState(true);
  const [newLeague, setNewLeague] = useState(false);
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchLeagues(q)).then(() => {
      setLoading(false);
    });
  }, [dispatch, q]);
  return (
    <div className=" mt-8 px-8 py-8 bg-white shadow-lg rounded-lg w-full">
      {newLeague ? <NewLeagueModal setNewLeague={setNewLeague} /> : null}
      <div className="flex items-start justify-between">
        <h2 className="text-gray-800 text-3xl font-semibold">Leagues</h2>
        <div className="bg-green-400 text-sm leading-none rounded-full inline-flex ">
          <button
            className="inline-flex items-center transition-colors duration-300 ease-in focus:outline-none text-white rounded-l-full px-4 py-2 active"
            id="grid"
            onClick={() => {
              setNewLeague(true);
            }}
          >
            <AddIcon />
            <span className="ml-1">Add</span>
          </button>
        </div>
      </div>
      <div className="my-8">
        <LeagueSearchBar />
      </div>
      {loading ? <LoadingComponent /> : <FilterLeagues />}
    </div>
  );
};
