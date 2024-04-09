import React, { useEffect, useMemo, useState } from "react";
import { useAPI } from "../../services/APIService";

function AdviceCard({ label, value }) {
  const { weather, lc } = useAPI();

  const advice = {
    Clouds: [
      "Take your usual dose of reliever inhaler before going out",
      "Put extra care to take your medication as prescribed",
    ],
    Rain: [
      "Wear a mask to cover your nose and mouth loosely",
      "The mask can prevent airways from being shocked by cold air",
    ],
    Clear: [
      "Keep an eye on the air quality index forecast and pollen substances in the air",
      "Do not forgot to bring along your reliever inhaler with you",
    ],
    Thunderstorm: [
      "Stay indoors and avoid going outside during a thunderstorm",
      "Make sure your windows and doors are closed to minimize exposure to allergens that may be carried by the storm",
    ],
    Drizzle: [
      "If you need to go outside, wear a light jacket or hoodie to protect yourself from moisture",
      "Carry your inhaler with you in case the dampness triggers any symptoms",
    ],
    snow: [
      "Dress warmly, covering your mouth and nose with a mask to filter the air before breathing it in",
      "Avoid strenuous activities in the cold and take breaks indoors if needed",
    ],
    Snow: [
      "Dress warmly, covering your mouth and nose with a mask to filter the air before breathing it in",
      "Avoid strenuous activities in the cold and take breaks indoors if needed",
    ],
    Mist: [
      "Be cautious when going outside in misty conditions, as moisture in the air can irritate your airways",
      "Consider wearing a mask or using a scarf to cover your nose and mouth",
    ],
    Smoke: [
      "Stay indoors and keep your windows and doors closed to minimize exposure to smoke",
      "Use air purifiers or filters to improve indoor air quality",
    ],
    Haze: [
      "Stay indoors as much as possible during hazy conditions",
      "If you need to go outside, wear a mask to filter out some of the pollutants in the air",
      "Carry your inhaler with you in case any symptoms triggered",
    ],
    Dust: [
      "Avoid areas with high dust levels, such as construction sites or dusty environments",
      "Use a damp cloth to clean surfaces in your home and reduce dust accumulation",
    ],
    Fog: [
      "Minimize outdoor activities during foggy conditions, as moisture in the air can trigger asthma symptoms",
      "If you need to go outside, wear a mask to filter out some of the pollutants in the air",
    ],
    Sand: [
      "Protect your airways from sand particles by wearing a mask that covers your nose and mouth",
      "Seek shelter indoors during sandstorms or strong winds carrying sand particles",
    ],
    Ash: [
      "Stay indoors during ashfall and keep windows and doors closed to prevent ash from entering your home",
      "Use air purifiers or filters to reduce the amount of ash in the air",
    ],
    Squall: [
      "Take precautions, seek shelter indoors and stay away from windows",
      "If you need to go outside, wear protective clothing such as a windbreaker or jacket with a hood",
    ],
    Tornado: [
      "Take immediate shelter in a basement, storm cellar, or interior room away from windows",
      "Make sure you have your emergency asthma medications with you in case of an asthma attack",
    ],
  };

  return (
    <div className={`bg-white rounded-xl p-3 font-bold mt-4`}>
      <div className="mb-6 text-center">
        {lc("Health Recommendation for Asthmatic Patients: ")}{" "}
        {lc(weather?.details)}
      </div>

      <div
        className={`rounded-xl bg-slate-100 px-5 py-3 font-normal flex flex-col gap-3 text-sm`}
      >
        {weather?.details &&
          (advice[weather?.details] ?? []).map((v, i) => (
            <div key={i}>
              {i + 1}. {lc(v)}
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdviceCard;
