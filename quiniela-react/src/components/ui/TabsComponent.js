import React from "react";

export const TabsComponent = ({ tabs, tabSelected, setTabSelected }) => {
  const selectedClasses =
    "text-blue-500 border-b-2 font-medium border-blue-500";
  return (
    <div>
      <div className="bg-white">
        <nav className="flex flex-col sm:flex-row">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={
                "text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none " +
                (tabSelected === index ? selectedClasses : "")
              }
              onClick={() => {
                setTabSelected(index);
              }}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
