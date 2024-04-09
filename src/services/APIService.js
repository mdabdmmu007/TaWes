import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { db, getDocuments } from "../firebase";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthService";
import getFormattedWeatherData from "./weatherService";
import { allText } from "../constants/Data";

const datetime = () => new Date().toLocaleString();

const APIContext = React.createContext();

export const useAPI = () => useContext(APIContext);

export const APIProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [ginaRecord, setGinaRecord] = useState([]);
  const { currentUser } = useAuth();
  const [lastUserId, setLastUserId] = useState();
  const [weather, setWeather] = useState(null);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    if (currentUser?.uid && lastUserId != currentUser?.uid) {
      fetchData();
      setLastUserId(currentUser?.uid);
    }
  }, [currentUser]);

  useEffect(() => {
    if (navigator.geolocation && weather == null) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setWeather(
          await getFormattedWeatherData({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        );
      });
    }
  }, [navigator.geolocation]);

  const changeLanguage = () => {
    setLanguage((l) => (l === "en" ? "ms" : "en"));
  };

  // language convertor
  const lc = (v) => {
    if (language == "en") return v;
    return allText[v][0];
  };

  const fetchData = async () => {
    await getGinaRecord();
    setLoading(false);
  };

  // gina record
  const getGinaRecord = async () => {
    const data = await getDocuments("records", currentUser?.uid);
    setGinaRecord(
      data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
    );
  };

  const createGinaRecord = async (data) => {
    await setDoc(doc(db, "records", uuidV4()), {
      aqi: data?.aqi,
      dateTime: datetime(),
      status: data?.status,
      userId: currentUser?.uid,
      weather: data?.weather,
    });
    await getGinaRecord();
  };

  return (
    <APIContext.Provider
      value={{
        weather,
        ginaRecord,
        createGinaRecord,
        getGinaRecord,
        language,
        changeLanguage,
        lc,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
