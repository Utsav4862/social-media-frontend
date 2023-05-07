import React, { useEffect, useState } from "react";
import "./home.css";

import { BsHandThumbsUp, BsFillHandThumbsUpFill } from "react-icons/bs";
import { Avatar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserState } from "../Context/user";
import { getTkn } from "../Func/getToken";
import { URL } from "../API/api";
import axios from "axios";
import { getCurrentUser } from "../API/userApi";
import { doLikeUnlikePost } from "../API/postsApi";

function Home() {
  const navigate = useNavigate();

  const { user, setUser } = UserState();
  const [posts, setPosts] = useState([]);

  const getFollowingPosts = () => {
    getTkn().then(async (tkn) => {
      let config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tkn}`,
        },
      };

      let { data } = await axios.get(`${URL}/post/following`, config);

      setPosts(data);
    });
  };

  const getCurrentUserDetail = async () => {
    const data = await getCurrentUser();
    console.log(data);
    setUser(data);
  };

  const likeUnlikePost = async (id, i, value) => {
    const data = await doLikeUnlikePost(id, value);
    if (data) {
      let temp = [...posts];
      temp[i] = data;
      setPosts(temp);
    }
  };

  useEffect(() => {
    getFollowingPosts();
    getCurrentUserDetail();
    let tkn = localStorage.getItem("user");
    if (!tkn) {
      navigate("/");
    }
  }, []);

  return (
    <div
      style={{
        // backgroundColor: "red",
        width: "35%",
        margin: "auto",
        textAlign: "left",
        marginTop: "10px",
        borderRight: "1px solid lightgray",
        borderLeft: "1px solid lightgray",
        padding: "10px",
      }}
    >
      {/* {user !== undefined ? ( */}
      <div className="header">
        <div className="profile_pic">
          <Avatar
            src={user ? user.profile_img : ""}
            sx={{ width: 50, height: 50 }}
          />
        </div>
        <div>
          <h4>{user ? user.name : "sfds"}</h4>
          <p>{user ? user.username : "sdf"}</p>
        </div>
      </div>

      {posts.map((post, i) => (
        <div className="post" key={post._id}>
          <div className="post_header">
            <div className="profile_pic">
              <Avatar
                src={post.user.profile_img}
                sx={{ width: 30, height: 30 }}
              />
            </div>
            <div>
              <p>{post.user.username}</p>
            </div>
          </div>
          <div className="post_pic">
            <img className="post_img" src={post.image} />
          </div>
          <div className="reaction_banner">
            {post.likes.includes(user._id) ? (
              <BsFillHandThumbsUpFill
                size={30}
                color="#2abd6e"
                onClick={() => likeUnlikePost(post._id, i, "unlike")}
              />
            ) : (
              <BsHandThumbsUp
                size={30}
                onClick={() => likeUnlikePost(post._id, i, "like")}
              />
            )}
          </div>
          <h4>{post.likes.length} likes</h4>
          <div className="caption">
            <h4 style={{ marginRight: "10px" }}>{post.user.username}</h4>
            <p>{post.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
