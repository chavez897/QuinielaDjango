import React from "react";

export const LoadingComponent = () => {
  const style = {
    top: "50%",
  };
  return (
    <div className="flex py-24">
      <span
        className="text-blue-900 items-center top-1/2 my-0 mx-auto block h-full"
        style={style}
      >
        <i className="fas fa-circle-notch fa-spin fa-5x"></i>
      </span>
    </div>
  );
};
