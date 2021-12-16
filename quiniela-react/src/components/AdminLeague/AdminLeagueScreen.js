import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getGeneralConfigurationLeagueAction } from "../../actions/GeneralConfiguration";
import { getSelectedLeagueInfo } from "../../actions/selectedLeague";
import { LoadingComponent } from "../ui/LoadingComponent";
import { TabsComponent } from "../ui/TabsComponent";
import { GeneralForm } from "./GeneralForm";

export const AdminLeagueScreen = () => {
  const { league } = useParams();
  const [tabSelected, setTabSelected] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(getSelectedLeagueInfo(league)).then(() => {
      setIsLoading(false);
    });
    dispatch(
      getGeneralConfigurationLeagueAction([
        {
          id: new Date().valueOf(),
          question: "Mejor Ofensiva",
          answer: 1,
          answerObject: { value: 1, label: "San Francisco 49ers" },
        },
      ])
    );
  }, [dispatch, league]);
  const leagueInfo = useSelector((state) => state.selectedLeague);
  const tabs = ["Configuration", "General Round", "Superbowl"];

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
      <div>{tabSelected === 0 && <div></div>}</div>
      <div>{tabSelected === 1 && <GeneralForm league={league} />}</div>
    </div>
    // <div className=" mt-8 px-8 py-8 bg-white shadow-lg rounded-lg w-full">
    //   <div className="text-center">
    //     <h2 className="text-gray-800 text-3xl font-semibold">
    //       {leagueInfo.name}
    //     </h2>
    //   </div>
    //   <div className="my-8">
    //     <div className="my-5">
    //       <h4 className="text-gray-800 text-2xl font-semibold">
    //         Configuration
    //       </h4>
    //       <hr />
    //     </div>
    //     <div className="my-5">
    //       <GeneralForm league={league} />
    //     </div>
    //   </div>
    // </div>
  );
};
