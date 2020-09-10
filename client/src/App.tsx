import React, { FormEvent, useEffect, useState } from "react";
import {
  Link as RouterLink,
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  Link,
} from "@material-ui/core";
import CameraIcon from "@material-ui/icons/PhotoCamera";

import jwtDecode from "jwt-decode";
import axios from "axios";

import {
  ErrorType,
  LogInValuesType,
  SignUpValuesType,
  ValidationErrorsType,
} from "./types";
import About from "./pages/About";
import setAuthToken from "./utils/setAuthToken";

const App = () => {
  const [userId, setUserId] = useState({ id: "" });

  const [logInValues, setLogInValues] = useState<LogInValuesType>({
    email: "",
    password: "",
  });
  const [signUpValues, setInputValues] = useState<SignUpValuesType>({
    email: "",
    password: "",
    username: "",
    name: "",
  });
  const [errors, setErrors] = useState<ValidationErrorsType>({});
  const [message, setMessage] = useState({ type: "", message: "" });

  useEffect(() => {
    if (localStorage.token) {
      const token = localStorage.getItem("token");
      const user = jwtDecode(token ? token : "") as {
        exp: number;
        iat: number;
        user: { id: string };
      };
      setUserId(user.user);
    }
  }, []);

  const logOut = async () => {
    try {
      await axios.post("/api/signout");
      localStorage.removeItem("token");
      setUserId({ id: "" });
      setAuthToken(localStorage.token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmitLogIn = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", logInValues);
      setMessage({ type: "success", message: response.data.message });
      localStorage.setItem("token", response.data.token);
      const user = jwtDecode(response.data.token) as {
        exp: number;
        iat: number;
        user: { id: string };
      };
      setUserId(user.user);
      setErrors({});
      setAuthToken(localStorage.token);
    } catch (e) {
      if (e.response.data.details) {
        const errorFields = { email: "", password: "", username: "", name: "" };
        e.response.data.details.forEach((errDetail: ErrorType) => {
          const path = errDetail.path[0];
          if (path) errorFields[path] = errDetail.message;
        });
        setErrors(errorFields);
      }
      if (e.response.data.message) {
        setMessage({ type: "error", message: e.response.data.message });
      }
    }
  };

  const handleSubmitSignUp = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/signup", signUpValues);
      setMessage({ type: "success", message: response.data.message });
      localStorage.setItem("token", response.data.token);
      const user = jwtDecode(response.data.token) as {
        exp: number;
        iat: number;
        user: { id: string };
      };
      setUserId(user.user);
      setErrors({});
      setAuthToken(localStorage.token);
    } catch (e) {
      if (e.response.data.details) {
        const errorFields = { email: "", password: "", username: "", name: "" };
        e.response.data.details.forEach((errDetail: ErrorType) => {
          const path = errDetail.path[0];
          if (path) errorFields[path] = errDetail.message;
        });
        setErrors(errorFields);
      }
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
              <CameraIcon style={{ marginRight: 8 }} />
              <Typography variant="h6" color="inherit" noWrap>
                Album layout
              </Typography>
            </div>
            <div>
              <Link
                style={{ margin: "0 10px" }}
                color="inherit"
                to="/"
                component={RouterLink}
              >
                Home
              </Link>
              <Link
                style={{ margin: "0 10px" }}
                color="inherit"
                to="/about"
                component={RouterLink}
              >
                About
              </Link>
              {userId.id ? (
                <Link
                  style={{ margin: "0 10px" }}
                  color="inherit"
                  onClick={logOut}
                >
                  Log Out
                </Link>
              ) : (
                <>
                  <Link
                    style={{ margin: "0 10px" }}
                    color="inherit"
                    to="/login"
                    component={RouterLink}
                  >
                    Log In
                  </Link>
                  <Link
                    style={{ margin: "0 10px" }}
                    color="inherit"
                    to="/signup"
                    component={RouterLink}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route
            path="/login"
            render={(props) => (
              <LogIn
                handleSubmitLogIn={handleSubmitLogIn}
                logInValues={logInValues}
                setLogInValues={setLogInValues}
                errors={errors}
                message={message}
              />
            )}
          />
          <Route
            path="/signup"
            render={(props) => (
              <SignUp
                handleSubmitSignUp={handleSubmitSignUp}
                signUpValues={signUpValues}
                setInputValues={setInputValues}
                errors={errors}
                message={message}
              />
            )}
          />
          <Route path="/about" render={(props) => <About />} />
          <Route path="/" render={(props) => <Home />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
