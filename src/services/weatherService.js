import { DateTime } from "luxon";
import {
  UilLaughing,
  UilGrin,
  UilMeh,
  UilSick,
  UilSadSquint,
  UilQuestion,
} from "@iconscout/react-unicons";

const UNITS = "metric";
const API_KEY = "cacea8f3f0fe4bce838878eb03883dd9";
const BASE_URL = "https://api.openweathermap.org/data";
let timezonePointer;

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({
    ...searchParams,
    units: UNITS,
    appid: API_KEY,
  });
  // url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, description, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    description,
    icon,
    speed,
  };
};

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 8).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
      weather: d.weather[0].description,
    };
  });

  hourly = hourly.slice(1, 25).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ha"),
      temp: d.temp,
      icon: d.weather[0].icon,
      weather: d.weather[0].description,
    };
  });

  timezonePointer = timezone;

  return { timezone, daily, hourly };
};

const formatAirQualityIndex = (data) => {
  const {
    list: [
      {
        main: { aqi },
        components: { pm2_5, pm10, no2 },
      },
    ],
  } = data;

  return { aqi, pm2_5, pm10, no2 };
};

const formatAirQualityForecast = (data) => {
  let { list } = data;
  let counter = 0;

  let aqiForecast = list.map((d) => {
    let airQualitativeName, logo;
    switch (d.main.aqi) {
      case 1:
        airQualitativeName = "Good (1)";
        logo = (
          <UilLaughing
            size={30}
            className="text-green-300 hover:scale-125 transition"
          />
        );
        break;
      case 2:
        airQualitativeName = "Fair (2)";
        logo = (
          <UilGrin
            size={30}
            className="text-blue-300 hover:scale-125 transition"
          />
        );
        break;
      case 3:
        airQualitativeName = "Moderate (3)";
        logo = (
          <UilMeh
            size={30}
            className="text-yellow-300 hover:scale-125 transition"
          />
        );
        break;
      case 4:
        airQualitativeName = "Poor (4)";
        logo = (
          <UilSick
            size={30}
            className="text-orange-300 hover:scale-125 transition"
          />
        );
        break;
      case 5:
        airQualitativeName = "Very Poor (5)";
        logo = (
          <UilSadSquint
            size={30}
            className="text-red-400 hover:scale-125 transition"
          />
        );
        break;
      default:
        airQualitativeName = "Undefined";
        logo = (
          <UilQuestion
            size={30}
            className="text-white hover:scale-125 transition"
          />
        );
    }
    return {
      counter: counter++,
      title: d.dt,
      aqi: airQualitativeName,
      logo: logo,
    };
  });

  let aqiForecastHourly = aqiForecast.slice(1, 25).map((d) => {
    return {
      title: formatToLocalTime(d.title, timezonePointer, "ha"),
      aqi: d.aqi,
      logo: d.logo,
    };
  });

  let aqiForecastDaily = aqiForecast
    .filter((aqi) => {
      return (aqi.counter + 9) % 24 === 0;
    })
    .map((d) => {
      return {
        title: formatToLocalTime(d.title, timezonePointer, "ccc"),
        aqi: d.aqi,
        aqiStyling: d.aqiStyling,
        logo: d.logo,
      };
    });

  return { aqiForecastDaily, aqiForecastHourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "2.5/weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("3.0/onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    // units: searchParams.units,
  }).then(formatForecastWeather);

  const formattedAirQualityIndex = await getWeatherData("2.5/air_pollution", {
    lat,
    lon,
    exclude: "current,minutely,hourly,alerts",
    // units: searchParams.units,
  }).then(formatAirQualityIndex);

  const formattedAirQualityForecast = await getWeatherData(
    "2.5/air_pollution/forecast",
    {
      lat,
      lon,
      exclude: "current,minutely,hourly,alerts",
      // units: searchParams.units,
    }
  ).then(formatAirQualityForecast);

  return {
    ...formattedCurrentWeather,
    ...formattedForecastWeather,
    ...formattedAirQualityIndex,
    ...formattedAirQualityForecast,
  };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
