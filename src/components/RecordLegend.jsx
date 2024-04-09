import React from "react";
import { Divider } from "@mui/material";
import { useAPI } from "../services/APIService";

function RecordLegend() {
  const { lc } = useAPI();

  return (
    <div className="grid grid-cols-4 gap-3 divide-x divide-gray-500 px-2 text-center text-sm mobile:text-xs items-center mt-10">
      <div>{lc("Date Time")}</div>
      <div className="pl-3">{lc("Asthma Status")}</div>
      <div className="pl-3">{lc("Weather")}</div>
      <div className="pl-3">{lc("Air Quality")}</div>
    </div>
  );
}

export default RecordLegend;
