import React from "react";

export const LoadingModal = ({ message }) => {
  const style = {
    top: "50%",
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-60 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t"></div>
            {/*body*/}
            <div className="relative p-6 flex-auto mx-36">
              <div className="flex py-4">
                <span
                  className="text-blue-900 items-center top-1/2 my-0 mx-auto block h-full"
                  style={style}
                >
                  <i className="fas fa-circle-notch fa-spin fa-5x"></i>
                </span>
              </div>
              <p className="mx-auto text-center text-sm">Loading ...</p>
              <p className="font-bold">{message}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
