import React from "react";
import { useState, useEffect } from "react";
import FormAction from "./FormAction";
import FormInputs from "./FormInputs";
import { useAuth } from "../services/AuthService";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setButtonClicked((currentClicked) => {
      return !currentClicked;
    });

    try {
      setError("");
      setLoading(true);
      await resetPassword(email);
      toast.info("Check your email for password reset link");
      toast.success("An email has been sent to your address");
    } catch (error) {
      console.log(error);
      setError(error.toString());
    }

    setLoading(false);
  }

  useEffect(() => {
    const resetPasswordFailed = () => {
      if (error !== "") {
        toast.error(error);
      }
    };

    resetPasswordFailed();
  }, [buttonClicked, error]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        <FormInputs
          key={"email-address"}
          handleChange={handleEmailChange}
          value={email}
          labelText={"Email address"}
          labelFor={"email-address"}
          id={"email-address"}
          name={"email"}
          type={"email"}
          isRequired={true}
          autoComplete={"email"}
          placeholder={"Email address"}
        />
      </div>

      <div className="text-sm flex items-center justify-end">
        <Link
          to="/login"
          className="font-medium text-purple-600 hover:text-purple-400"
        >
          Back to Login
        </Link>
      </div>
      <FormAction
        loading={loading}
        handleSubmit={handleSubmit}
        text="Reset Password"
      />

      <ToastContainer
        autoClose={3000}
        theme="colored"
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </form>
  );
}
export default ForgotPassword;
