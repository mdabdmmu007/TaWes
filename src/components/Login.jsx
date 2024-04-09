import React from "react";
import { useState, useEffect } from "react";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import FormInputs from "./FormInputs";
import { authentications } from "../constants/formFields";
import Authentications from "./Authentications";
import { useAuth } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, currentUser, user, addNewUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setButtonClicked((currentClicked) => {
      return !currentClicked;
    });

    try {
      setError("");
      setLoading(true);
      login(email, password).then(()=>{
        navigate("/");
      });
      // console.log(data)
      // navigate("/");
    } catch (error) {
      console.log(JSON.stringify(error));
      if (error?.code === "auth/user-not-found") setError("User not found");
      else setError(error.toString());
    }

    setLoading(false);
  }

  useEffect(() => {
    const loginFailed = () => {
      if (error !== "") {
        toast.error(error);
      }
    };

    loginFailed();
  }, [buttonClicked, error]);

  useEffect(() => {
    if (currentUser && user) {
      if (user?.role === 'user') {
        navigate("/");
      } else if (user?.role === 'admin') {
        navigate("/admin");
      } else if (user?.role === 'healthcare') {
        navigate("/healthcare");
      }
    }
  }, [currentUser]);

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
      </div>

      <FormExtra />
      <FormAction loading={loading} handleSubmit={handleSubmit} text="Login" />
      <div className="relative flex items-center justify-center w-full border border-t border-purple-400">
        <div className="absolute px-3 bg-white text-violet-600">Or</div>
      </div>

      {authentications.map((auth) => (
        <Authentications
          key={auth.id}
          symbol={auth.symbol}
          text={auth.text}
          linkUrl={auth.linkUrl}
          onClick={() => auth.onClick(addNewUser)}
        />
      ))}

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
export default Login;
