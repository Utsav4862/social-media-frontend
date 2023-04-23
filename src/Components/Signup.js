import React from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const login = () => {
    navigate("/");
  };

  return (
    <div className="box_wrapper">
      <div className="box">
        <h1>Create a New Account...</h1>
        <div class="inp_box">
          <input
            className="inp"
            type="email"
            name=""
            id=""
            placeholder="Email address"
          />
          <br />
          <input
            className="inp"
            type="email"
            name=""
            id=""
            placeholder="Username"
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
          <button className="btn" type="submit" style={{ color: "#fff" }}>
            Sign Up
          </button>

          <h4>
            Already have an Account?{" "}
            <span
              style={{ color: "#2abd6e", cursor: "pointer" }}
              onClick={login}
            >
              {" "}
              Login Now
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Signup;
