import React from "react";

export const PointsRow = ({ team }) => {
  return (
    <tr className="text-gray-700 standings-row">
      {team.points.map((week, idx) => (
        <td
          key={"week-" + idx + team.id}
          className="px-4 py-3 text-ms font-semibold border"
        >
          {week}
        </td>
      ))}
      <td className="px-4 py-3 text-ms font-semibold border">{team.total}</td>
    </tr>
  );
};
