import React from "react";
import MenuBar from "../components/MenuBar";
import PageTitle from "../components/PageTitle";
import ProfileCard from "../components/ProfileCard";
import { useAPI } from "../services/APIService";
import { useAuth } from "../services/AuthService";
import { Navigate } from "react-router-dom";
import AdminMenuBar from "../components/AdminMenuBar";
import HealthCareMenuBar from "../components/HealthCareMenuBar";

function DashboardPage() {
  const { lc } = useAPI();
  const { currentUser, user } = useAuth();
  return !currentUser
    ?
    <Navigate to="/login" />
    :
    !user ?
      <Navigate to={'/login'} />
      :
      (
        <div
          className="min-h-screen mx-auto max-w-3xl mobile:px-4 mobile:text-xs tablet:text-md tablet:px-20 tabletxs:px-8
  py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-600 bg-purple-200 items-center"
        >
          {
            user.role === "admin" &&
            <AdminMenuBar textColor={"text-slate-800"} />
          }
          {
            user.role === "healthcare" &&
            <HealthCareMenuBar textColor={"text-slate-800"} />
          }
          {
            user.role === "user" &&
            <MenuBar textColor={"text-slate-800"} />
          }

          <PageTitle title={lc("Profile")} />
          <ProfileCard />
        </div>
      );
}

export default DashboardPage;
