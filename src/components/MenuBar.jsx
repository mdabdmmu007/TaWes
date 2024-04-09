import React, { useState, useEffect } from "react";
import {
  UilBars,
  UilUserCircle,
  UilClouds,
  UilFileQuestionAlt,
  UilClipboardNotes,
  UilChartBar,
  UilTimes,
  UilLanguage,
} from "@iconscout/react-unicons";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../services/AuthService";
import { useAPI } from "../services/APIService";

function MenuBar({ textColor = "text-gray-300" }) {
  // const logout = () => {
  //   window.open("http://localhost:5000/auth/logout", "_self");
  // };

  const [showMenu, setShowMenu] = useState(false);
  const { currentUser, logout } = useAuth();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { lc, language, changeLanguage } = useAPI();

  const buttonClicked = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      setUsername(docSnap.data().username);
    };

    getUser();
  }, [currentUser.uid]);

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      toast.error(error.toString());
    }
  }

  return (
    <div className="flex flex-row my-6 w-full">
      <div className="flex flex-row w-1/4 items-baseline space-x-4 justify-start">
        <UilBars
          size={25}
          className={`flex flex-row cursor-pointer transition ease-out hover:text-white ${textColor}`}
          onClick={buttonClicked}
        />
      </div>

      <nav className="items-center font-semibold z-40">
        <div
          className={`transition-transform ease-in-out mx-auto flex-col flex items-center fixed inset-0 max-w-3xl justify-center uppercase gap-12
          text-white text-xl bg-black/40 backdrop-blur-lg sm:hidden
          ${
            showMenu
              ? " duration-500"
              : "-translate-y-full duration-700 max-h-full"
          }`}
        >
          <ul
            className={`flex-col flex items-center gap-12 flex-1 justify-center`}
          >
            <li>
              <UilTimes
                size={35}
                className="cursor-pointer absolute top-8 right-6 hover:scale-125 transition ease-out"
                onClick={buttonClicked}
              />
            </li>
            <li
              className="hover:scale-110 transition ease-out"
              onClick={buttonClicked}
            >
              <Link to="/" className="flex flex-row gap-1">
                <UilClouds />
                {lc("Weather")}
              </Link>
            </li>
            <li
              className="hover:scale-110 transition ease-out"
              onClick={buttonClicked}
            >
              <Link to="/gina-test" className="flex flex-row gap-1">
                <UilFileQuestionAlt />
                {lc("GINA Test")}
              </Link>
            </li>
            <li
              className="hover:scale-110 transition ease-out"
              onClick={buttonClicked}
            >
              <Link to="/records" className="flex flex-row gap-1">
                <UilClipboardNotes />
                {lc("GINA Records")}
              </Link>
            </li>
            <li
              className="hover:scale-110 transition ease-out"
              onClick={buttonClicked}
            >
              <Link to="/health-advice" className="flex flex-row gap-1">
                <UilChartBar />
                {lc("Health Advice")}
              </Link>
            </li>
          </ul>
          <div
            className={`flex gap-2 items-center p-1 border-2 ${textColor} hover:text-white hover:border-white border-gray-300 ml-6 rounded-md cursor-pointer text-sm pr-2 mb-10`}
            onClick={changeLanguage}
          >
            <UilLanguage
              size={20}
              className={`transition ease-out cursor-pointer`}
            />
            <div className="select-none">{language.toUpperCase()}</div>
          </div>
        </div>
        <div
          className={`transition-transform ease-in-out flex-col flex items-center fixed inset-0 justify-center right-1/4 uppercase gap-12
          text-white text-xl rounded-r-xl bg-black/40 backdrop-blur-lg xl:hidden lg:hidden md:hidden
          ${showMenu ? " duration-500" : "-translate-x-full duration-700"}`}
        >
          <ul
            className={`flex-col flex items-center gap-12 flex-1 justify-center`}
          >
            <li>
              <UilTimes
                size={35}
                className="cursor-pointer absolute top-8 right-6 hover:scale-125 transition ease-out"
                onClick={buttonClicked}
              />
            </li>
            <li
              className="hover:scale-110 transition ease-out"
              onClick={buttonClicked}
            >
              <Link to="/" className="flex flex-row gap-1">
                <UilClouds />
                {lc("Weather")}
              </Link>
            </li>
            <li
              className="hover:scale-110 transition ease-out"
              onClick={buttonClicked}
            >
              <Link to="/gina-test" className="flex flex-row gap-1">
                <UilFileQuestionAlt />
                {lc("GINA Test")}
              </Link>
            </li>
            <li
              className="hover:scale-110 transition ease-out"
              onClick={buttonClicked}
            >
              <Link to="/records" className="flex flex-row gap-1">
                <UilClipboardNotes />
                {lc("GINA Records")}
              </Link>
            </li>
            <li
              className="hover:scale-110 transition ease-out"
              onClick={buttonClicked}
            >
              <Link to="/health-advice" className="flex flex-row gap-1">
                <UilChartBar />
                {lc("Health Advice")}
              </Link>
            </li>
          </ul>
          <div
            className={`flex gap-2 items-center p-1 border-2 ${textColor} hover:text-white hover:border-white border-gray-300 ml-6 rounded-md cursor-pointer text-sm pr-2 mb-10`}
            onClick={changeLanguage}
          >
            <UilLanguage
              size={20}
              className={`transition ease-out cursor-pointer`}
            />
            <div className="select-none">{language.toUpperCase()}</div>
          </div>
        </div>
      </nav>

      <div className="flex flex-row w-3/4 justify-end">
        <ul className="flex items-center">
          <li className="mr-1 cursor-pointer object-cover">
            {/* <img
              src={process.env.PUBLIC_URL + "/xxx.jpeg"}
              alt=""
              className="mobile:w-7 mobile:h-7 tablet:w-8 tablet:h-8 w-9 h-9 rounded-full"
            /> */}
            <Link to={"/dashboard"}>
              <UilUserCircle
                size={25}
                className={`${textColor} hover:text-white transition ease-out`}
              />
            </Link>
          </li>
          <li
            className={`mr-5 mobile:mr-3 font-medium ${textColor} cursor-pointer hover:text-white text-sm capitalize transition ease-out`}
          >
            <Link to={"/dashboard"}>{username}</Link>
          </li>
          <li
            className={`font-medium cursor-pointer ${textColor} hover:text-white text-sm transition ease-out`}
            // onClick={handleLogout}
          >
            <button onClick={handleLogout}>{lc("Logout")}</button>
          </li>
        </ul>
      </div>

      <ToastContainer
        autoClose={3000}
        theme="colored"
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </div>
  );
}

export default MenuBar;
