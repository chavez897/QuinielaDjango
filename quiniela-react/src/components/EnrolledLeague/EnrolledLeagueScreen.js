import React, { useEffect, useState } from "react";
import { GamePredictionsScreen } from "../GamePredictions/GamePredictionsScreen";
import { TabsComponent } from "../ui/TabsComponent";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedLeagueInfo } from "../../actions/selectedLeague";

export const EnrolledLeagueScreen = () => {
  const [tabSelected, setTabSelected] = useState(1);
  const tabs = ["Standings", "Current Week"];
  const { league } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSelectedLeagueInfo(league));
  }, [dispatch, league]);
  const leagueInfo = useSelector((state) => state.selectedLeague);
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
    </div>
  );
};
