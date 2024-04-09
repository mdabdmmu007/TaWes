import React from "react";
import TopButtons from "../components/TopButtons";
import Inputs from "../components/Inputs";
import LocalDateTime from "../components/LocalDateTime";
import MenuBar from "../components/MenuBar";
import TemperatureAndDetails from "../components/TemperatureAndDetails";
import Forecast from "../components/Forecast";
import { useEffect, useState } from "react";
import getFormattedWeatherData from "../services/weatherService";
import { toast } from "react-toastify";
import { DateTime } from "luxon";
import "react-toastify/dist/ReactToastify.css";

function WeatherPage() {
  const [query, setQuery] = useState({ q: "cyberjaya" });
  // const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      // await getFormattedWeatherData({ ...query, units }).then((data) => {
      await getFormattedWeatherData({ ...query }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query]);
  // }, [query, units]);

  const formatBackground = () => {
    // if (!weather) return "from-violet-700 to-violet-400";
    // const thresholdCold = units === "metric" ? 20 : 60;
    // const thresholdMid = units === "metric" ? 30 : 70;
    // if (weather.temp <= thresholdCold) return "from-violet-700 to-violet-400";
    // if (weather.temp <= thresholdMid) return "from-sky-700 to-sky-400";
    // return "from-yellow-600 to-orange-500";

    let weatherCondition = weather ? weather.details : null;
    let dayOrNight = "day";
    if (weather) {
      dayOrNight =
        DateTime.fromSeconds(weather.dt).setZone(weather.timezone).hour <= 6 ||
        DateTime.fromSeconds(weather.dt).setZone(weather.timezone).hour >= 18
          ? "night"
          : "day";
    }

    switch (weatherCondition) {
      case "Thunderstorm":
        return 'bg-[url("/src/images/thunderstorm.jpg")]';
      case "Drizzle":
        return 'bg-[url("/src/images/drizzle.jpg")]';
      case "Rain":
        return 'bg-[url("/src/images/rain.gif")]';
      case "Clear":
        if (dayOrNight === "day") return 'bg-[url("/src/images/clear.jpg")]';
        else return 'bg-[url("/src/images/night.jpg")]';
      case "Clouds":
        if (dayOrNight === "day") return 'bg-[url("/src/images/clouds.jpg")]';
        else return 'bg-[url("/src/images/nightClouds.jpg")]';
      case "snow":
      case "Snow":
        return 'bg-[url("/src/images/snow.jpg")] bg-top';
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Fog":
      case "Sand":
      case "Ash":
      case "Squall":
      case "Tornado":
        return 'bg-[url("/src/images/haze.jpg")]';
      default:
        return 'bg-[url("/src/images/clouds.jpg")]';
    }
  };

  return (
    <div
      className={`mx-auto max-w-3xl mobile:px-4 mobile:text-xs tablet:text-sm tablet:px-20 tabletxs:px-8 bg-no-repeat bg-cover py-5 px-32 shadow-xl
      shadow-gray-600 ${formatBackground()}`}
    >
      <MenuBar />
      <TopButtons setQuery={setQuery} />

      {weather && (
        <div>
          <Inputs
            setQuery={setQuery}
            // units={units}
            // setUnits={setUnits}
            weather={weather}
          />
          <LocalDateTime weather={weather} />
          <TemperatureAndDetails weather={weather} />

          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
          <Forecast
            title="air quality hourly forecast"
            items={weather.aqiForecastHourly}
          />
          <Forecast
            title="air quality daily forecast"
            items={weather.aqiForecastDaily}
          />
        </div>
      )}
    </div>
  );
}

export default WeatherPage;
