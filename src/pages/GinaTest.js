import React, { useState } from "react";
import MenuBar from "../components/MenuBar";
import PageTitle from "../components/PageTitle";
import QuestionCard from "../components/QuestionCard";
import Button from "../components/Button";
import { questions } from "../constants/formFields";
import GinaTestResult from "../components/ginaTest/Result";
import { useNavigate } from "react-router-dom";
import getFormattedWeatherData from "../services/weatherService";
import { useAPI } from "../services/APIService";
import { toast } from "react-toastify";

export const getGinaTestStatusProps = (v) => {
  const data = [
    {
      level: "High",
      text: "Uncontrolled Asthma",
      color: { text: "text-red-400", bg: "bg-red-400" },
    },
    {
      level: "Medium",
      text: "Partly Controlled Asthma",
      color: { text: "text-orange-400", bg: "bg-orange-300" },
    },
    {
      level: "Low",
      text: "Well-Controlled Asthma",
      color: { text: "text-green-400", bg: "bg-green-400" },
    },
  ];
  if (v >= 0 && v < data.length) return data[v];
  return {
    text: "Undefined",
    color: { text: "text-black", bg: "bg-slate-100" },
  };
};

function GinaTestPage() {
  const [submited, setSubmited] = useState(false);
  const [answer, setAnswer] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [resultIndex, setResultIndex] = useState(null);
  const navigate = useNavigate();
  const { weather, createGinaRecord, lc } = useAPI();

  const handleSubmit = async () => {
    if (weather == null)
      toast.error(
        "Please try again, you may need to turn on location service."
      );
    let _resultIndex = 2;

    // compute the result
    const totalAnswerOfYes = Object.entries(answer).filter(
      ([_, answer]) => answer
    ).length;
    if (totalAnswerOfYes > 2) _resultIndex = 0;
    else if (totalAnswerOfYes > 0) _resultIndex = 1;

    await createGinaRecord({
      aqi: weather?.aqi,
      status: _resultIndex,
      weather: weather?.details,
    });

    setResultIndex(_resultIndex);
    setSubmited(true);
  };

  const handleViewRecords = () => navigate("/records", { replace: true });

  return (
    <div
      className="mx-auto max-w-3xl min-h-screen mobile:px-4 mobile:text-xs tablet:text-md tablet:px-20 tabletxs:px-8
      py-5 px-32 bg-gradient-to-br shadow-gray-600 bg-purple-200 items-center h-full flex flex-col"
    >
      <MenuBar textColor={"text-slate-800"} />

      {submited ? (
        <PageTitle title={lc("GINA Result")} />
      ) : (
        <PageTitle title={lc("GINA Test")} />
      )}

      {submited ? (
        <GinaTestResult value={resultIndex} />
      ) : (
        <div className="w-full flex-1 flex flex-col justify-center gap-2 my-10">
          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              title={question.title}
              header={question.header}
              content={question.content}
              onAnswer={(v) => setAnswer((obj) => ({ ...obj, [index]: v }))}
            />
          ))}
        </div>
      )}
      <Button onClick={submited ? handleViewRecords : handleSubmit}>
        {submited ? lc("View Records") : lc("Submit")}
      </Button>
    </div>
  );
}

export default GinaTestPage;
