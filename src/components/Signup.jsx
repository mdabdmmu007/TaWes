import React from "react";
import { useState, useEffect } from "react";
import FormAction from "./FormAction";
import FormInputs from "./FormInputs";
import { useAuth } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState("user");
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const clearForm = async () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setButtonClicked((currentClicked) => {
      return !currentClicked;
    });

    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, username, role);
      clearForm();
      toast.info("Logging In...");
      toast.success("Signup successful");
      await new Promise((res) => setTimeout(res, 3250));
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.toString());
    }

    setLoading(false);
  }

  useEffect(() => {
    const signupError = () => {
      if (error === "Passwords do not match") {
        toast.warning(error);
      } else if (error !== "") {
        toast.error(error);
      }
    };

    signupError();
  }, [buttonClicked, error]);

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        <FormInputs
          key={"username"}
          handleChange={handleUsernameChange}
          value={username}
          labelText={"Username"}
          labelFor={"username"}
          id={"username"}
          name={"username"}
          type={"text"}
          isRequired={true}
          autoComplete={"username"}
          placeholder={"Username"}
        />
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
        <FormInputs
          key={"password"}
          handleChange={handlePasswordChange}
          value={password}
          labelText={"Password"}
          labelFor={"password"}
          id={"password"}
          name={"password"}
          type={"password"}
          isRequired={true}
          autoComplete={"current-password"}
          placeholder={"Password"}
        />
        <FormInputs
          key={"confirm-password"}
          handleChange={handlePasswordConfirmChange}
          value={passwordConfirm}
          labelText={"Confirm Password"}
          labelFor={"confirm-password"}
          id={"confirm-password"}
          name={"confirm-password"}
          type={"password"}
          isRequired={true}
          autoComplete={"confirm-password"}
          placeholder={"Confirm Password"}
        />
        <div>

          <select className="w-full bg-transparent justify-center rounded-md appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="healthcare">Health Care</option>
          </select>
        </div>
        <FormAction
          loading={loading}
          handleSubmit={handleSubmit}
          text="Signup"
        />
      </div>

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

export default Signup;
