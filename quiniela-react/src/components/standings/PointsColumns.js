import React, { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { PointsRow } from "./PointsRow";

export const PointsColumns = () => {
  const currentWeek = useSelector((state) => state.currentWeek);
  const weeks = useMemo(() => {
    let weeks = [];
    for (let i = 1; i <= currentWeek.week; i++) {
      weeks.push(i);
    }
    return weeks;
  }, [currentWeek.week]);
  const standings = useSelector((state) => state.standings);
  const scrollTable = useRef(null);
  useEffect(() => {
    scrollTable.current.scrollTo(
      scrollTable.current.scrollWidth - scrollTable.current.clientWidth,
      0
    );
  }, []);
  return (
    <section className="container mx-auto font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto" ref={scrollTable}>
          <table className="w-full">
            <thead className="standings-header">
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                {weeks.map((week) => (
                  <th key={week} className="px-4 py-3">
                    Week {week}
                  </th>
                ))}
                <th className="px-4 py-3">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {standings.map((team) => (
                <PointsRow key={"points" + team.id} team={team} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
