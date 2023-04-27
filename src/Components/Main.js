import React from "react";
import SideBar from "./SideBar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Profile from "../Pages/Profile";
import Home from "../Pages/Home";
import CreatePost from "../Pages/CreatePost";

function Main() {
  const navigate = useNavigate();

  return (
    <div
      style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}
    >
      <div
        style={{
          width: "15%",
          height: "100vh",
          position: "fixed",
          left: 0,
          borderRight: "1px solid rgba(0,0,0,0.2)",
        }}
      >
        <SideBar />
      </div>
      <div style={{ width: "85%", textAlign: "center" }}>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/profile/:uname" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </div>
    </div>
  );
}

export default Main;
