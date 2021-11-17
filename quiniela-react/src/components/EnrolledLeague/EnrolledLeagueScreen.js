import React, { useState } from "react";
import { GamePredictionsScreen } from "../GamePredictions/GamePredictionsScreen";
import { TabsComponent } from "../ui/TabsComponent";
// import { useParams } from "react-router-dom";

export const EnrolledLeagueScreen = () => {
  const [tabSelected, setTabSelected] = useState(0);
  const tabs = ["Game Predictions", "Play offs"];
  /*const currentWeek = 11;
  const currentSeason = 2021;
  const { league } = useParams();
  console.log(league);*/
  return (
    <div className=" mt-8 px-8 py-8 bg-white shadow-lg rounded-lg w-full">
      <div className="flex items-start justify-between">
        <h2 className="text-gray-800 text-3xl font-semibold">SuperLiga</h2>
      </div>
      <div className="my-8">
        <TabsComponent
          tabs={tabs}
          tabSelected={tabSelected}
          setTabSelected={setTabSelected}
        />
      </div>
      <div>{tabSelected === 0 && <GamePredictionsScreen />}</div>
    </div>
  );
};
