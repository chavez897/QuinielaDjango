import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { predictGameAction } from "../../actions/predictions";

export const GamePredictionItem = ({ difference, prediction }) => {
  const dispatch = useDispatch();
  const disabled = false;
  const options = [
    { text: "Winner by more than " + difference, value: "AG" },
    { text: "Winner by less or equal than " + difference, value: "AL" },
    { text: "Winner by less or equal than " + difference, value: "HL" },
    { text: "Winner by more than " + difference, value: "HG" },
  ];
  const [tempPrediction, setTempPrediction] = useState(prediction.prediction);
  return (
    <div className="w-full grid grid-cols-4 gap-1">
      {options.map((choice, index) => (
        <div key={index} className="col-span-1 block mx-auto">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name={"prediction" + prediction.id}
              value={choice.value}
              disabled={disabled}
              checked={tempPrediction === choice.value}
              onChange={() => {
                setTempPrediction(choice.value);
                dispatch(predictGameAction(prediction.id, choice.value));
              }}
            />
            <span className="ml-2 text-xs">{choice.text}</span>
          </label>
        </div>
      ))}
    </div>
  );
};
