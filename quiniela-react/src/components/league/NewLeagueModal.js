import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { createLeague } from "../../actions/leagues";
import { useForm } from "../../hooks/useForm";
import { ErrorModal } from "../ui/ErrorModal";
import { LoadingModal } from "../ui/LoadingModal";
import { ModalComponent } from "../ui/ModalComponent";
import { SuccessModal } from "../ui/SuccessModal";
import { NewLeagueForm } from "./NewLeagueForm";
import queryString from "query-string";
import { searchLeagues } from "../../actions/leagues";

export const NewLeagueModal = ({ setNewLeague }) => {
  const [isPrivate, setIsPrivate] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState();
  const [formValues, handleInputChange] = useForm({
    name: "",
    code: "",
  });
  const [loading, setLoading] = useState(false);
  const [succesfull, setSuccesfull] = useState(false);
  const [error, setError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { name, code } = formValues;
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isPrivate) {
      setIsFormValid(name.trim().length > 0 && code.trim().length > 0);
    } else {
      setIsFormValid(name.trim().length > 0);
    }
  }, [isPrivate, name, code]);
  const handleSubmit = () => {
    setLoading(true);
    let formdata = new FormData();
    formdata.append("name", name);
    formdata.append("isPublic", !isPrivate);
    formdata.append("enrolledCode", isPrivate ? code : null);
    if (selectedPicture !== null && selectedPicture !== undefined) {
      formdata.append("picture", selectedPicture);
    }
    createLeague(formdata)
      .then((res) => {
        dispatch(searchLeagues(q));
        setLoading(false);
        setModalMessage(res.name + " league created!");
        setSuccesfull(true);
      })
      .catch((error) => {
        setLoading(false);
        setModalMessage(
          error.length <= 0 ? "Error please try again" : error[0].message
        );
        setError(true);
      });
  };
  return (
    <>
      {loading ? <LoadingModal /> : null}
      {succesfull ? (
        <SuccessModal
          message={modalMessage}
          close={() => {
            setSuccesfull(false);
            setNewLeague(false);
          }}
        />
      ) : null}
      {error ? (
        <ErrorModal
          message={modalMessage}
          close={() => {
            setError(false);
          }}
        />
      ) : null}
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
