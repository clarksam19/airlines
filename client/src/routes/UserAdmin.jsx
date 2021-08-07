import React, { useState } from "react";
import { login } from "../reducers/rootReducer";
import { useDispatch } from "react-redux";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import Notification from "../components/Notification";
import userAdminService from "../services/userAdminService";
import notify from "../utils/notify";

const UserAdmin = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);
  const [notification, setNotification] = useState(notify().reset);

  const resetNotification = () => {
    setTimeout(() => {
      setNotification(notify().reset);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const credentials = { username, password };
      dispatch(login(credentials));
      setNotification(notify(username).success.login);
      setUsername("");
      setPassword("");
      resetNotification();
    } catch (err) {
      setNotification(notify().error.login);
      resetNotification();
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      await userAdminService.signup({
        username,
        password,
      });

      setUsername("");
      setPassword("");
      setNotification(notify().success.signup);
      resetNotification();
    } catch (err) {
      setNotification(notify().error.signup);
      resetNotification();
    }
  };

  const show = (formName) => {
    if (formName === "login") {
      setLoginVisible(true);
      setSignupVisible(false);
    } else if (formName === "signup") {
      setLoginVisible(false);
      setSignupVisible(true);
    } else {
      return;
    }
  };

  return (
    <div>
      <Notification notification={notification} />
      <button data-testid="btn-login" onClick={() => show("login")}>
        login
      </button>
      <button data-testid="btn-signup" onClick={() => show("signup")}>
        signup
      </button>
      <div
        data-testid="form-login"
        style={{ display: loginVisible ? "" : "none" }}
      >
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      </div>
      <div
        data-testid="form-signup"
        style={{ display: signupVisible ? "" : "none" }}
      >
        <SignupForm
          handleSignup={handleSignup}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      </div>
    </div>
  );
};

export default UserAdmin;
