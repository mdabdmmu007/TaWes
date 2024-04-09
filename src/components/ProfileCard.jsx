import React, { useState, useEffect } from "react";
import { useAuth } from "../services/AuthService";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAPI } from "../services/APIService";

function ProfileCard() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { lc } = useAPI();

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
      console.log(docSnap.data());
    };

    getUser();
  }, [currentUser.uid]);

  return (
    <div className="mx-auto bg-white rounded-md my-10 py-6 mobile:pt-4 mobile:pb-2 px-10">
      <p className="capitalize">
        <span className="font-semibold text-center text-xl mobile:text-base mx-2">
          ID:
        </span>
        {user.userId}
      </p>
      <p className="capitalize">
        <span className="font-semibold text-center text-xl mobile:text-base mx-2">
          Username:
        </span>
        {user.username}
      </p>
      <p>
        <span className="font-semibold text-center text-xl mobile:text-base mx-2">
          Email:
        </span>
        {currentUser.email}
      </p>
      <button
        type="submit"
        className="mx-auto relative w-3/4 flex justify-center mt-5 mobile:mt-3 mobile:mb-3 py-1.5 px-20 mobile:px-14 border border-transparent text-md font-semibold rounded-md text-black bg-neutral-300 hover:bg-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400"
        onClick={() => {
          navigate("/update-profile");
        }}
      >
        {lc("Update Profile")}
      </button>
    </div>
  );
}

export default ProfileCard;
