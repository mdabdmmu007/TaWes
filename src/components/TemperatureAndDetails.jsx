import React from "react";
import {
  // UilTemperature,
  // UilTear,
  // UilCloudWind,
  UilChartLine,
  Uil10Plus,
  UilCoronavirus,
  UilChannel,
  UilMountainsSun,
  UilSunset,
  UilTemperaturePlus,
  UilTemperatureMinus,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

function TemperatureAndDetails({
  weather: {
    details,
    description,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
    aqi,
    pm2_5,
    pm10,
    no2,
  },
}) {
  let airQualitativeName,
    aqiTextColor,
    pm2_5QualitativeName,
    pm2_5TextColor,
    pm10QualitativeName,
    pm10TextColor,
    no2QualitativeName,
    no2TextColor;

  switch (aqi) {
    case 1:
      airQualitativeName = "Good (1)";
      aqiTextColor = "text-green-300";
      break;
    case 2:
      airQualitativeName = "Fair (2)";
      aqiTextColor = "text-blue-300";
      break;
    case 3:
      airQualitativeName = "Moderate (3)";
      aqiTextColor = "text-yellow-300";
      break;
    case 4:
      airQualitativeName = "Poor (4)";
      aqiTextColor = "text-orange-300";
      break;
    case 5:
      airQualitativeName = "Very Poor (5)";
      aqiTextColor = "text-red-400";
      break;
    default:
      airQualitativeName = "Undefined";
      aqiTextColor = "text-white";
  }

  if (pm2_5 >= 0 && pm2_5 <= 10) {
    pm2_5QualitativeName = "Good (1)";
    pm2_5TextColor = "text-green-300";
  } else if (pm2_5 > 10 && pm2_5 <= 25) {
    pm2_5QualitativeName = "Fair (2)";
    pm2_5TextColor = "text-blue-300";
  } else if (pm2_5 > 25 && pm2_5 <= 50) {
    pm2_5QualitativeName = "Moderate (3)";
    pm2_5TextColor = "text-yellow-300";
  } else if (pm2_5 > 50 && pm2_5 <= 75) {
    pm2_5QualitativeName = "Poor (4)";
    pm2_5TextColor = "text-orange-300";
  } else if (pm2_5 > 75) {
    pm2_5QualitativeName = "Very Poor (5)";
    pm2_5TextColor = "text-red-400";
  } else {
    pm2_5QualitativeName = "Undefined";
    pm2_5TextColor = "text-white";
  }

  if (pm10 >= 0 && pm10 <= 20) {
    pm10QualitativeName = "Good (1)";
    pm10TextColor = "text-green-300";
  } else if (pm10 > 20 && pm10 <= 50) {
    pm10QualitativeName = "Fair (2)";
    pm10TextColor = "text-blue-300";
  } else if (pm10 > 50 && pm10 <= 100) {
    pm10QualitativeName = "Moderate (3)";
    pm10TextColor = "text-yellow-300";
  } else if (pm10 > 100 && pm10 <= 200) {
    pm10QualitativeName = "Poor (4)";
    pm10TextColor = "text-orange-300";
  } else if (pm10 > 200) {
    pm10QualitativeName = "Very Poor (5)";
    pm10TextColor = "text-red-400";
  } else {
    pm10QualitativeName = "Undefined";
    pm10TextColor = "text-white";
  }

  if (no2 >= 0 && no2 <= 40) {
    no2QualitativeName = "Good (1)";
    no2TextColor = "text-green-300";
  } else if (no2 > 40 && no2 <= 70) {
    no2QualitativeName = "Fair (2)";
    no2TextColor = "text-blue-300";
  } else if (no2 > 70 && no2 <= 150) {
    no2QualitativeName = "Moderate (3)";
    no2TextColor = "text-yellow-300";
  } else if (no2 > 150 && no2 <= 200) {
    no2QualitativeName = "Poor (4)";
    no2TextColor = "text-orange-300";
  } else if (no2 > 200) {
    no2QualitativeName = "Very Poor (5)";
    no2TextColor = "text-red-400";
  } else {
    no2QualitativeName = "Undefined";
    no2TextColor = "text-white";
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-between text-white pb-2 ">
        <div className="flex flex-row items-center justify-between flex-1 w-full">
          <div className="flex flex-col justify-center items-center text-xl sm:text-lg mobilexs:text-base text-sky-200 ">
            <p className="pt-4 mobile:pt-0 tablet:pt-2">{details}</p>
            <img
              src={iconUrlFromCode(icon)}
              alt={details}
              title={description}
              className="w-28 sm:w-24 mobilexs:w-20 hover:scale-110 transition"
            />
          </div>
          <p className="mobile:text-7xl text-9xl tablet:text-8xl tabletxs:text-8xl mobilexs:text-6xl flex-1 text-center">
            {`${temp.toFixed()}`}
            <span className=" align-top mobile:text-3xl text-5xl tablet:text-4xl tabletxs:text-4xl mobilexs:text-2xl">
              °C
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-2 w-100">
          {/* 
          <div className="flex font-light text-sm sm:text-xs items-center justify-center">
            <UilTemperature size={18} className="mr-1" />
            Real Feel:
            <span className="font-medium ml-1">{`${feels_like.toFixed()}°C`}</span>
          </div>
          <div className="flex font-light text-sm sm:text-xs items-center justify-center">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="flex font-light text-sm sm:text-xs items-center justify-center">
            <UilCloudWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{`${speed.toFixed()} km/h`}</span>
          </div> 
          */}
          {[
            { Icon: UilChartLine, label: "AQI", color: aqiTextColor, value: airQualitativeName },
            { Icon: UilChannel, label: "PM2.5", color: pm2_5TextColor, value: pm2_5QualitativeName },
            { Icon: Uil10Plus, label: "PM10", color: pm10TextColor, value: pm10QualitativeName },
            { Icon: UilCoronavirus, label: "NO2", color: no2TextColor, value: no2QualitativeName },
          ].map(({ Icon, label, color, value }, index) => (
            <div
              className="flex font-light text-sm sm:text-xs items-center justify-center tracking-wider"
              key={index}
            >
              <div className="flex flex-1">
                <Icon size={18} className="mr-1" />
                {label}
              </div>

              <div className={`font-medium ml-1 ${color} tracking-normal flex-2`}>{`${value}`}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 mobile:space-x-0.5 tablet:space-x-1 text-white text-sm mobile:text-xs tablet:text-xs py-3 mobile:py-1">
        <UilMountainsSun />
        <p className="font-light">
          Rise:
          <span className="font-medium ml-1">{formatToLocalTime(sunrise, timezone, "hh:mma")}</span>
        </p>
        <p className="font-light">|</p>
        <UilSunset />
        <p className="font-light">
          Set:
          <span className="font-medium ml-1">{formatToLocalTime(sunset, timezone, "hh:mma")}</span>
        </p>
        <p className="font-light">|</p>
        <UilTemperaturePlus />
        <p className="font-light">
          High:
          <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>
        <UilTemperatureMinus />
        <p className="font-light">
          Low:
          <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
