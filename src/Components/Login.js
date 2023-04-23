import React from "react";
import "./loginSign.css";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();

  const signup = () => {
    navigate("signup");
  };

  const login = () => {
    navigate("home");
  };
  return (
    <div className="box_wrapper">
      <div className="box">
        <h1>Login to Continue...</h1>
        <div class="inp_box">
          <input
            className="inp"
            type="text"
            name=""
            id=""
            placeholder="Enter Username or Email address"
          />
          <br />
          <input
            className="inp"
            type="password"
            name=""
            id=""
            placeholder="Enter Password"
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
