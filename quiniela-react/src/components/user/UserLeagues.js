import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyLeagues } from "../../actions/myLeagues";
import { LeagueItem } from "./LeagueItem";

export const UserLeagues = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyLeagues());
  }, [dispatch]);
  const myLeagues = useSelector((state) => state.myLeagues);
  return (
    <div className="px-8 py-8 bg-white shadow-lg rounded-lg w-full">
      <div>
        <h2 className="text-gray-800 text-3xl font-semibold">My Teams</h2>
        <div className="max-h-96 mt-8 overflow-auto">
          {myLeagues.map((league) => (
            <LeagueItem key={league.id} {...league} />
          ))}
        </div>
      </div>
    </div>
  );
};
