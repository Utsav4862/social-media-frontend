import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../API/api";
import { Alert, Snackbar } from "@mui/material";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false)
  const [userError, setUserError] = useState(false);
  const [errorInfo, setErrorInfo] = useState("")

  const navigate = useNavigate();

  const login = () => {
    navigate("/");
  };

  const checkUserName = async (val) => {
    let { data } = await axios.get(`${URL}/user/check/${val}`);
    console.log(data);
    if (data.error) {
      setUserError(true);
    } else {
      setUserError(false);
    }
  };

  const signup = async () => {
    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!reg.test(email)){
      setError(true)
      setErrorInfo("Invalid Email!!!")
      console.log("Email is not in proper format");
      return;
    }

    if(username.trim().length !== 0|| name.trim().length !== 0 || password.trim().length !== 0){
      const { data } = await axios.post(`${URL}/user/signup`, {
        email,
        username,
        name,
        password,
      });
      
      if (data.user) {
        navigate("/");
      }
    }else{
      setError(true)
      setErrorInfo("Invalid Details")
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkUserName(username);
    }, 100);
  }, [username]);

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className="inp"
            type="text"
            name=""
            id=""
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />

          {userError ? <p>Username already Exist</p> : <></>}
          <input
            className="inp"
            type="text"
            name=""
            id=""
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            className="inp"
            type="password"
            name=""
            id=""
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button
            className="btn"
            type="submit"
            style={{ color: "#fff" }}
            onClick={signup}
          >
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
      <Snackbar
        open={error}
        autoHideDuration={1000}
        onClose={() => setError(false)}
       
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {errorInfo}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Signup;
