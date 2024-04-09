import React from "react";
import { useAPI } from "../services/APIService";

function QuestionCards({ title, header, content, onAnswer }) {
  const { lc } = useAPI();

  return (
    <div className="mx-auto w-full bg-white rounded-md my-2 py-6 mobile:pt-4 mobile:pb-2 px-7">
      <div className="-translate-y-9 mobile:-translate-y-7 absolute z-10 text-xl mobile:text-base px-2 bg-neutral-300 rounded-lg uppercase font-semibold">
        {lc(title)}
      </div>
      <p className="font-medium">{lc(header)}</p>
      <ul className="list-disc font-normal text-xs py-1.5 px-4 mobile:pr-1">
        <li>{lc(content)}</li>
      </ul>
      <div className="flex justify-around pt-2 text-lg mobile:text-base font-medium">
        <label>
          <input
            type="radio"
            value="no"
            name={lc(title)}
            defaultChecked
            onInput={() => onAnswer(false)}
            className="cursor-pointer place-self-center mx-1 h-4 w-4 mobile:h-3 mobile:w-3"
          />
          {lc("No")}
        </label>
        <label>
          <input
            type="radio"
            value="yes"
            name={lc(title)}
            onInput={() => onAnswer(true)}
            className="cursor-pointer mx-1 h-4 w-4 mobile:h-3 mobile:w-3"
          />
          {lc("Yes")}
        </label>
      </div>
    </div>
  );
}

export default QuestionCards;
