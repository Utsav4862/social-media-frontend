import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserState } from "../Context/user";
import { getCurrentUser, getUrlSearchedUser } from "../API/userApi";
import { Avatar, Button } from "@mui/material";
import "./Profile.css";
import { getUsersPost } from "../API/postsApi";

function Profile() {
  let { uname } = useParams();
  const { user, setUser } = UserState();
  const [profileUser, setProfileUser] = useState();
  const [posts, setPosts] = useState([]);
  const [buttonFlag, setButtonFlag] = useState(false);

  const getUser = async () => {
    let userData = await getCurrentUser();
    if (uname && userData.username === uname) {
      setButtonFlag(true);
      setProfileUser(userData);
      let po = await getUsersPost(userData._id);
      setPosts(po);
    } else if (uname) {
      console.log(userData);
      let data = await getUrlSearchedUser(uname);
      console.log(data);
      setProfileUser(data);
      let po = await getUsersPost(data._id);
      setPosts(po);
    } else {
      setProfileUser(userData);
      let po = await getUsersPost(userData._id);
      setPosts(po);
    }
  };

  useEffect(() => {
    getUser();
    // getPosts();
  }, []);

  return (
    <div
      style={{
        // backgroundColor: "red",
        width: "70%",
        marginLeft: "30%",
        marginTop: "10px",
        padding: "10px",
      }}
    >
      {profileUser ? (
        <div style={{ width: "100%" }}>
          <div className="profile_header">
            <div className="profile_pic">
              <Avatar
                src={profileUser.profile_img}
                sx={{ width: 150, height: 150 }}
              />
            </div>
            <div className="prof_header_right">
              <div style={{ textAlign: "left" }}>
                <h4 style={{ marginBottom: "2px" }}>{profileUser.name}</h4>
                <p style={{ marginBottom: "10px" }}>{profileUser.username}</p>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div>
                  <h4 style={{ textAlign: "center" }}>{posts.length}</h4> Posts
                </div>
                <div>
                  <h4 style={{ textAlign: "center" }}>
                    {profileUser.follower.length}
                  </h4>{" "}
                  Followers
                </div>
                <div>
                  <h4 style={{ textAlign: "center" }}>
                    {profileUser.following.length}
                  </h4>{" "}
                  Followings
                </div>
              </div>
            </div>
            {uname && !buttonFlag ? (
              <Button
                variant="outlined"
                style={{
                  color: "#2abd6e",
                  borderColor: "#2abd6e",
                  fontWeight: "600",
                }}
              >
                Follow
              </Button>
            ) : (
              <Button
                variant="outlined"
                style={{
                  fontWeight: "600",
                }}
              >
                Edit Profile
              </Button>
            )}
          </div>
          <div className="posts">
            {posts
              ? posts.map((post) => (
                  <div className="post_imgg">
                    <img src={post.image} className="img" />
                  </div>
                ))
              : ""}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Profile;
