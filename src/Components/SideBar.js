import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SideBarData } from "../Data/SidebarData";
import { green } from "@mui/material/colors";

function SideBar() {
  const navigate = useNavigate();
  const test = () => {
    navigate("/home/profile");
  };

  const navLinkStyle = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "rgba(0,0,0,0.1)" : "#FFF",
      border: isActive ? "black" : "",
      height: "100%",
      width: "100%",
      display: "inline-block",
      lineHeight: "50px",
      fontSize: "20px",
      fontWeight: "600",
      color: "#000",
      // padding: "15px",
      borderRadius: "15px",
      textDecoration: "none",
      textAlign: "center",
    };
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // alignItems: "center",
        border: "1px",
        borderColor: "red",
      }}
    >
      {SideBarData.map((item) => (
        <div style={{ textAlign: "left", height: "50px" }}>
          <NavLink exact to={item.path} style={navLinkStyle}>
            <span style={{ lineHeight: "100%" }}>{item.icon}</span> {item.label}{" "}
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default SideBar;
