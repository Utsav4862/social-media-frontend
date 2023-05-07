import React, { useEffect, useState } from "react";
import { doSearch } from "../API/postsApi";
import { Avatar } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

function Search() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const navigate = useNavigate();

  const navLinkStyle = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "rgba(0,0,0,0.1)" : "#FFF",
      border: isActive ? "black" : "",
      color: "#000",

      textDecoration: "none",
    };
  };

  const getSearchResult = async () => {
    if (search !== "") {
      let data = await doSearch(search);
      console.log(data);
      setResult(data);
    } else {
      setResult([]);
    }
  };

  useEffect(() => {
    let tkn = localStorage.getItem("user");
    if (!tkn) {
      navigate("/");
    }
    getSearchResult();
  }, [search]);

  return (
    <div
      style={{
        width: "50%",
        textAlign: "center",
        marginLeft: "20%",
        marginTop: "10px",
        padding: "10px",
      }}
    >
      <div>
        <input
          type="text"
          className="search_inp"
          placeholder=" Search username, name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={{ width: "100%", marginTop: "10px" }}>
        {result
          ? result.map((user) => (
              <NavLink
                to={`/profile/${user.username}`}
                className="user"
                style={navLinkStyle}
              >
                <div>
                  <Avatar src={user.profile_img} />
                </div>
                <div style={{ textAlign: "left", marginLeft: "20px" }}>
                  <h4>{user.username}</h4>
                  <p style={{ color: "gray" }}>{user.name}</p>
                </div>
              </NavLink>
            ))
          : ""}
      </div>
    </div>
  );
}

export default Search;
