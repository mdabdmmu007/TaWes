import React from "react";
import { cities } from "../constants/formFields";

function TopButtons({ setQuery }) {
  return (
    <div className="flex items-center justify-around py-2 px-1 rounded-lg bg-black bg-opacity-10">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white sm:text-sm mobilexs:text-xs text-lg font-medium cursor-pointer transition ease-out hover:scale-110 sm:hover:scale-110 capitalize"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
