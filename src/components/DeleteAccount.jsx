import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../services/AuthService";
import { useAPI } from "../services/APIService";

export default function DeleteAccount() {
  const { currentUser, deleteThisUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { lc } = useAPI();

  return (
    <div className="text-sm flex items-center justify-end">
      <button
        disabled={loading}
        className="font-medium text-purple-600 hover:text-purple-400"
        onClick={() => {
          setLoading(true);
          deleteThisUser(currentUser.uid).then(() => {
            toast
              .success("Account deleted")
              .catch(() => {
                toast.error("Failed to delete account");
              })
              .finally(() => {
                setLoading(false);
              });
          });
        }}
      >
        {lc("Delete Account")}
      </button>

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
