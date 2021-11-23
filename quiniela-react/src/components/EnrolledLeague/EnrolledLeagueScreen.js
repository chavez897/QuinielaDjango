import React, { useEffect, useState } from "react";
import { GamePredictionsScreen } from "../GamePredictions/GamePredictionsScreen";
import { TabsComponent } from "../ui/TabsComponent";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedLeagueInfo } from "../../actions/selectedLeague";
import { getMyPredictions } from "../../actions/predictions";
import { LoadingComponent } from "../ui/LoadingComponent";
import { StandingsScreen } from "../standings/StandingsScreen";
import { getStandings } from "../../actions/standings";

export const EnrolledLeagueScreen = () => {
  const [tabSelected, setTabSelected] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const tabs = ["Standings", "Current Week"];
  const { league } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(getSelectedLeagueInfo(league)).then((res) => {
      dispatch(getStandings(league)).then(() => {
        setIsLoading(false);
      });
      dispatch(getMyPredictions(res.data.id));
    });
  }, [dispatch, league]);
  const leagueInfo = useSelector((state) => state.selectedLeague);

  if (isLoading) {
    return (
      <div className=" mt-8 px-8 py-8 bg-white shadow-lg rounded-lg w-full">
        <LoadingComponent />
      </div>
    );
  }
  return (
    <div className=" mt-8 px-8 py-8 bg-white shadow-lg rounded-lg w-full">
      <div className="text-center">
        <h2 className="text-gray-800 text-3xl font-semibold">
          {leagueInfo.name}
        </h2>
      </div>
      <div className="my-8">
        <TabsComponent
          tabs={tabs}
          tabSelected={tabSelected}
          setTabSelected={setTabSelected}
        />
      </div>
      <div>{tabSelected === 1 && <GamePredictionsScreen />}</div>
      <div>{tabSelected === 0 && <StandingsScreen />}</div>
    </div>
  );
};
