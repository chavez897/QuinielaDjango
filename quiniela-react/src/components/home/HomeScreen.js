import React from "react";
import { UserCard } from "../user/UserCard";
import { UserLeagues } from "../user/UserLeagues";

export const HomeScreen = () => {
  return (
    <div className="mt-20 mx-auto block grid grid-cols-3 md:gap-4 w-full">
      <div className="col-span-3 md:col-span-1">
        <UserCard />
      </div>
      <div className="col-span-3  md:col-span-2">
        <UserLeagues />
      </div>
    </div>
  );
};
