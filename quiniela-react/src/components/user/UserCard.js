import React from "react";
import { useSelector } from "react-redux";

export const UserCard = () => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg w-full block mx-auto">
        <img
          className="w-full"
          src={user.userprofile.picture}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            {user.name} {user.lastName} {user.secondLastName}
          </div>
        </div>
      </div>
    </div>
  );
};
