// import React, { useEffect, useState } from "react";
import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";

// function Inputs({ setQuery, units, setUnits, weather: { name, country } }) {
function Inputs({ setQuery, weather: { name, country } }) {
  const [city, setCity] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  /**
   * useEffect is used to deal with 'useState()' variables
   * everytime the state variable changes, 'useEffect' executes the code inside of it.
   *
   */
  // useEffect(() => {
  //   console.log(showSearchBar);
  // }, [showSearchBar]);

  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({ q: city });
      setCity("");
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  const switchShowSearchBarState = () => {
    setShowSearchBar((currentShowSearchBar) => {
      return !currentShowSearchBar;
    });
  };

  // const handleUnitsChange = (e) => {
  //   const selectedUnit = e.currentTarget.name;
  //   if (units !== selectedUnit) setUnits(selectedUnit);
  // };

  return (
    <div className="flex flex-row justify-center my-6 sm:mb-3">
      <div className="flex flex-row w-full items-center justify-center mobile:space-x-2 space-x-4">
        {!showSearchBar && (
          <p className="flex items-center justify-center text-center my-1 text-white text-3xl sm:text-2xl mobilexs:text-xl font-medium">
            {`${name}, ${country}`}
          </p>
        )}
        {showSearchBar && (
          <input
            value={city}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                switchShowSearchBarState();
                handleSearchClick();
              }
              if (e.key === "Escape") {
                switchShowSearchBarState();
                setCity("");
              }
            }}
            onChange={(e) => setCity(e.currentTarget.value)}
            type="text"
            placeholder="Search for city...."
            autoFocus={true}
            onBlur={() => {
              switchShowSearchBarState();
              setCity("");
            }}
            className="mobile:text-xs tablet:text-sm tabletxs:text-sm text-lg font-light text-white p-2 w-auto h-9 mobile:h-8 mobilexs:h-8 shadow-xl focus:outline-double capitalize placeholder:lowercase placeholder:text-slate-200 rounded-xl bg-black bg-opacity-5"
          />
        )}
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onMouseDown={() => {
            handleSearchClick();
          }}
          onMouseUp={() => {
            switchShowSearchBarState();
          }}
        />
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>

      {/* <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className="text-xl mobile:text-lg text-white font-light cursor-pointer transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="text-xl mobile:text-lg text-white mx-1">|</p>
        <button
          name="imperial"
          className="text-xl mobile:text-lg text-white font-light cursor-pointer transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div> */}
    </div>
  );
}

export default Inputs;
