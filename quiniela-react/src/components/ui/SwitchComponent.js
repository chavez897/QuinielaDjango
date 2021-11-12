import React from "react";

export const SwitchComponent = ({ toggle, setToggle, label }) => {
  const toggleClass = " transform translate-x-6";
  return (
    <div className="flex">
      <label className="mr-4 block text-gray-700 text-sm font-bold">
        {label}
      </label>
      <div
        className={
          "md:w-14 md:h-7 w-12 h-6 flex items-center rounded-full p-1 cursor-pointer" +
          (toggle ? " transform bg-green-500" : "transform bg-red-500")
        }
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        {/* Switch */}
        <div
          className={
            "bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform" +
            (toggle ? null : toggleClass)
          }
        ></div>
      </div>
    </div>
  );
};
