import React, { useState } from "react";

export const PictureInput = ({ selectedPicture, setSelectedPicture }) => {
  const [showPicture, setshowPicture] = useState();
  const [editPicture, setEditPicture] = useState(true);
  const fileSelectedHandler = (event) => {
    if (event.target.files[0]) {
      setSelectedPicture(event.target.files[0]);
      setEditPicture(false);
      let reader = new FileReader();
      reader.onload = (e) => {
        setshowPicture(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  if (!selectedPicture || editPicture) {
    return (
      <div>
        <label
          className="
    w-64
    flex flex-col
    items-center
    px-4
    py-6
    bg-white
    rounded-md
    shadow-md
    tracking-wide
    uppercase
    border border-blue
    cursor-pointer
    hover:bg-blue-800 hover:text-white
    text-blue-800
    ease-linear
    transition-all
    duration-150
  "
        >
          <i className="fas fa-cloud-upload-alt fa-3x"></i>
          <span className="mt-2 text-base leading-normal">Select a file</span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={fileSelectedHandler}
          />
        </label>
      </div>
    );
  } else {
    return (
      <div>
        <span
          className="w-full bg-transparent text-red-600 h-6 w-6 text-2xl block outline-none focus:outline-none text-right cursor-pointer"
          onClick={() => {
            setEditPicture(true);
            setSelectedPicture(null);
          }}
        >
          ×
        </span>
        <img
          className="ml-8 w-48 h-48 object-cover rounded-full"
          alt="asdf"
          src={showPicture}
        />
      </div>
    );
  }
};
