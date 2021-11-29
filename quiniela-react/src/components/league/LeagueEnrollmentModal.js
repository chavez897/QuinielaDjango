import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { ModalComponent } from "../ui/ModalComponent";
import { EnrollmentLeagueForm } from "./EnrollmentLeagueForm";
import { useDispatch, useSelector } from "react-redux";
import { LoadingModal } from "../ui/LoadingModal";
import { SuccessModal } from "../ui/SuccessModal";
import { ErrorModal } from "../ui/ErrorModal";
import { enrollLeague } from "../../actions/leagues";
import { getMyLeagues } from "../../actions/myLeagues";

export const LeagueEnrollmentModal = ({ setEnrollment, league }) => {
  const user = useSelector((state) => state.user);
  const [formValues, handleInputChange] = useForm({
    teamName: "",
    enrollCode: "",
  });
  const { teamName, enrollCode } = formValues;
  const [selectedPicture, setSelectedPicture] = useState();
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [succesfull, setSuccesfull] = useState(false);
  const [error, setError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (!league.isPublic) {
      setIsFormValid(
        teamName.trim().length > 0 && enrollCode.trim().length > 0
      );
    } else {
      setIsFormValid(teamName.trim().length > 0);
    }
  }, [teamName, enrollCode, league]);

  const handleSubmit = () => {
    setLoading(true);
    let formdata = new FormData();
    formdata.append("teamName", teamName);
    formdata.append("enrollCode", !league.isPublic ? enrollCode : null);
    formdata.append("teamPicture", selectedPicture);
    formdata.append("idUser", user.id);
    formdata.append("idLeague", league.id);
    enrollLeague(formdata)
      .then((res) => {
        dispatch(getMyLeagues());
        setLoading(false);
        setModalMessage("Enroll in League " + league.name + " !");
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
            setEnrollment(false);
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
        title={league.name}
        accept={handleSubmit}
        close={() => setEnrollment(false)}
        disabled={!isFormValid}
        body={
          <EnrollmentLeagueForm
            isPrivate={!league.isPublic}
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
