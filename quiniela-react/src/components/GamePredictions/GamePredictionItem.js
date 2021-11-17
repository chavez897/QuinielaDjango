import React from "react";

export const GamePredictionItem = ({
  difference,
  selected,
  setSelected,
  gameId,
}) => {
  const disabled = false;
  const options = [
    { text: "Winner by more than " + difference, value: "AG" },
    { text: "Winner by less or equal than " + difference, value: "AL" },
    { text: "Winner by less or equal than " + difference, value: "HL" },
    { text: "Winner by more than " + difference, value: "HG" },
  ];
  return (
    <div className="w-full grid grid-cols-4 gap-1">
      {options.map((choice, index) => (
        <div key={index} className="col-span-1 block mx-auto">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name={"prediction" + gameId}
              value={choice.value}
              disabled={disabled}
              checked={selected === choice.value}
              onChange={() => {
                setSelected(choice.value);
              }}
            />
            <span className="ml-2 text-xs">{choice.text}</span>
          </label>
        </div>
      ))}
    </div>
  );
};
