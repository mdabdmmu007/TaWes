import { UilGoogle } from "@iconscout/react-unicons";
import { UilFacebookF } from "@iconscout/react-unicons";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { Navigate } from "react-router-dom";

const cities = [
  {
    id: 1,
    title: "cyberjaya",
  },
  {
    id: 2,
    title: "klang",
  },
  {
    id: 3,
    title: "putrajaya",
  },
  {
    id: 4,
    title: "cheras",
  },
  {
    id: 5,
    title: "puchong",
  },
];

const authentications = [
  {
    id: "google",
    symbol: <UilGoogle size={23} className="text-white mx-1.5" />,
    text: "Login with google",
    linkUrl: "/",
    onClick: async (addNewUser) => {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        addNewUser(user.displayName, user.uid);
      });
    },
  },
  {
    id: "facebook",
    symbol: <UilFacebookF size={23} className="text-white mx-0.5" />,
    text: "Login with facebook",
    linkUrl: "/",
    onClick: async (addNewUser) => {
      const provider = new FacebookAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        addNewUser(user.displayName, user.uid);
      });
    },
  },
];

const questions = [
  {
    id: 1,
    title: "question 1",
    header: "In the past 4 weeks, do you have:",
    content: "Daytime asthma symptoms more than twice per week?",
  },
  {
    id: 2,
    title: "question 2",
    header: "In the past 4 weeks, do you have:",
    content: "Any night waking due to asthma?",
  },
  {
    id: 3,
    title: "question 3",
    header: "In the past 4 weeks, do you have:",
    content: "Reliever needed for symptoms more than twice per week?",
  },
  {
    id: 4,
    title: "question 4",
    header: "In the past 4 weeks, do you have:",
    content: "Any activity limitation due to asthma?",
  },
];

export { cities, authentications, questions };
