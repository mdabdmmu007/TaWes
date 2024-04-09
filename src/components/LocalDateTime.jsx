import React from "react";
import { formatToLocalTime } from "../services/weatherService";

function LocalDateTime({ weather: { dt, timezone, name, country } }) {
  return (
    <div>
      <div className="flex items-center justify-center my-3">
        <p className="text-white text-xl mobile:text-sm tablet:text-base tabletxs:text-sm mobilexs:text-xs font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      {/* <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl sm:text-2xl mobilexs:text-xl font-medium">
          {`${name}, ${country}`}
        </p>
      </div> */}
    </div>
  );
}

export default LocalDateTime;
