import React, { useState } from "react";
import "./loginSign.css";
import { useNavigate } from "react-router-dom";
import { URL } from "../API/api";
import axios from "axios";
import { UserState } from "../Context/user";
function Login() {
  const navigate = useNavigate();

  const { user, setUser } = UserState();
  const [emailOrUser, setEmailOrUser] = useState("");
  const [password, setPassword] = useState("");

  const signup = () => {
    navigate("signup");
  };

  const login = async () => {
    const { data } = await axios.post(`${URL}/user/login`, {
      emailOrUser,
      password,
    });

    console.log(data);
    if (data.token) {
      localStorage.setItem("user", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      setUser(data.user);
      navigate("home");
    }
  };
  return (
    <div className="box_wrapper">
      <div className="box">
        <h1>Login to Continue...</h1>
        <div className="inp_box">
          <input
            className="inp"
            type="text"
            name=""
            id=""
            placeholder="Enter Username or Email address"
            value={emailOrUser}
            onChange={(e) => {
              setEmailOrUser(e.target.value);
            }}
          />
          <br />
          <input
            className="inp"
            type="password"
            name=""
            id=""
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <button
            className="btn"
            type="submit"
            style={{ color: "#fff" }}
            onClick={login}
          >
            Login
          </button>

          <h4>
            Don't have an Account?{" "}
            <span
              style={{ color: "#2abd6e", cursor: "pointer" }}
              onClick={signup}
            >
              {" "}
              Create New
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Login;
