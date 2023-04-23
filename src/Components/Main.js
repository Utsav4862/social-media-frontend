import React from "react";
import SideBar from "./SideBar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Profile from "../Pages/Profile";
import Home from "../Pages/Home";

function Main() {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div
        style={{
          width: "15%",
          height: "100vh",
          borderRight: "1px solid rgba(0,0,0,0.2)",
        }}
      >
        <SideBar />
      </div>
      <div style={{ width: "85%", textAlign: "center" }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default Main;
