import React from "react";
import { iconUrlFromCode } from "../services/weatherService";
import { UilAngleLeftB, UilAngleRightB } from "@iconscout/react-unicons";

function Forecast({ title, items }) {
  const slideLeft = () => {
    const scrollIndex = title === "air quality hourly forecast" ? 330 : 320;

    const slider = document.getElementById(`slider${title}`);
    slider.scrollLeft = slider.scrollLeft - scrollIndex;
  };
  const slideRight = () => {
    const scrollIndex = title === "air quality hourly forecast" ? 330 : 320;

    const slider = document.getElementById(`slider${title}`);
    slider.scrollLeft = slider.scrollLeft + scrollIndex;
  };

  return (
    <div className="rounded-md bg-black bg-opacity-10 my-4 py-2 px-6 mobile:px-2">
      <div className="flex items-center justify-start my-2 mobile:my-2 tablet:my-4">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2 mobile:my-1" />
      <div className="flex flex-row">
        {title !== "air quality daily forecast" && (
          <UilAngleLeftB
            className="w-1/12 sm:hidden md:hidden opacity-50 cursor-pointer hover:opacity-100 mt-7"
            onClick={slideLeft}
          />
        )}
        <div
          className={`flex flex-row items-center justify-between gap-8 sm:gap-6 text-white overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide ${
            title === "air quality daily forecast"
              ? "w-full"
              : "lg:w-10/12 xl:w-10/12"
          }`}
          id={`slider${title}`}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className=" flex flex-col items-center justify-center"
            >
              <p className="font-light text-sm">{item.title}</p>
              {item.icon && (
                <img
                  src={iconUrlFromCode(item.icon)}
                  className="object-cover mx-6 sm:mx-6 hover:scale-150 mobile:hover:scale-125 transition"
                  alt={item.weather}
                  title={item.weather}
                />
              )}
              {item.icon && (
                <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
              )}
              {item.aqi && (
                <p
                  className="py-3 font-medium mx-2.5 sm:mx-[9px]"
                  title={item.aqi}
                >
                  {item.logo}
                </p>
              )}
            </div>
          ))}
        </div>
        {title !== "air quality daily forecast" && (
          <UilAngleRightB
            className="w-1/12 sm:hidden md:hidden opacity-50 cursor-pointer hover:opacity-100 mt-7"
            onClick={slideRight}
          />
        )}
      </div>
    </div>
  );
}

export default Forecast;
