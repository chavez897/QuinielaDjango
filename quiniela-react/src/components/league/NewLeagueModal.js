import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { ModalComponent } from "../ui/ModalComponent";
import { NewLeagueForm } from "./NewLeagueForm";

export const NewLeagueModal = ({ setNewLeague }) => {
  const [isPrivate, setIsPrivate] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState();
  const [formValues, handleInputChange] = useForm({
    name: "",
    code: "",
  });
  const { name, code } = formValues;
  useEffect(() => {
    if (isPrivate) {
      setIsFormValid(name.trim().length > 0 && code.trim().length > 0);
    } else {
      setIsFormValid(name.trim().length > 0);
    }
  }, [isPrivate, name, code]);
  const handleSubmit = () => {
    console.log(isPrivate);
    console.log(name);
    console.log(code);
    console.log(selectedPicture);
  };
  return (
    <>
      <ModalComponent
        title="New League"
        accept={handleSubmit}
        close={() => setNewLeague(false)}
        disabled={!isFormValid}
        body={
          <NewLeagueForm
            isPrivate={isPrivate}
            setIsPrivate={setIsPrivate}
            handleInputChange={handleInputChange}
            formValues={formValues}
            selectedPicture={selectedPicture}
            setSelectedPicture={setSelectedPicture}
          />
        }
      />
    </>
  );
};
