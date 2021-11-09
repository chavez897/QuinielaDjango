import React from "react";
import { UserCard } from "../user/UserCard";

export const HomeScreen = () => {
  return (
    <div className="mt-20 mx-20 grid grid-cols-3 gap-4">
      <div className="col-span-1">
        <UserCard />
      </div>
      <div className="col-span-2">9</div>
    </div>
  );
};
