import React from "react";
import { getGinaTestStatusProps } from "../../pages/GinaTest";
import { useAPI } from "../../services/APIService";

function GinaTestResult({ value }) {
  return (
    <div className="mb-10 flex flex-col items-center justify-center w-full flex-1 gap-3">
      <ResultBar
        min="3"
        max="4"
        value={value == 0}
        content={getGinaTestStatusProps(0)}
      />
      <ResultBar
        min="1"
        max="2"
        value={value == 1}
        content={getGinaTestStatusProps(1)}
      />
      <ResultBar
        min="0"
        value={value == 2}
        content={getGinaTestStatusProps(2)}
      />
    </div>
  );
}

export default GinaTestResult;

function ResultBar({ min, max, value, content }) {
  const { lc } = useAPI();

  return (
    <div
      className={`flex py-4 justify-between font-bold w-5/6 rounded-md px-6 gap-2 ${
        value ? content.color.bg : "bg-white"
      }`}
    >
      <div className="whitespace-nowrap w-14 text-center">
        {min}
        {min && max ? "-" : ""}
        {max}
      </div>
      <div className="text-end">{lc(content.text)}</div>
    </div>
  );
}
