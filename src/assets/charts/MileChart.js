import React from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip
} from "recharts";

import kilometersStaticsData from "../dummy-data/kilometersStatics";

const mileChart = () => {
  return (
    <ResponsiveContainer width="100%">
      <BarChart data={kilometersStaticsData}>
        <XAxis dataKey="name" stroke="#2884ff" />
        <Bar dataKey="rezerwacje" stroke="#2884ff" fill="#2884ff" barSize={30} />

        <Tooltip wrapperClassName="tooltip__style" cursor={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default mileChart;
