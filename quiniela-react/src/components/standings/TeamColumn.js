import React from "react";
import { useSelector } from "react-redux";
import { TeamItem } from "./TeamItem";

export const TeamColumn = () => {
  const standings = useSelector((state) => state.standings);
  return (
    <section className="container mx-auto font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full">
          <table className="w-full">
            <thead className="standings-header">
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3 w-full">Team</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {standings.map((team) => (
                <TeamItem key={"team-" + team.id} team={team} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
