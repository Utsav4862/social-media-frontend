import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { UserState } from "../Context/user";
import {
  doFollowUnFollow,
  getCurrentUser,
  getUrlSearchedUser,
} from "../API/userApi";
import { Alert, Avatar, Button, LinearProgress, Snackbar } from "@mui/material";
import "./Profile.css";
import { getUsersPost } from "../API/postsApi";
import EditProfile from "../Components/EditProfile";
import Post from "../Components/Post";

function Profile() {
  let { uname } = useParams();
  const { user, setUser } = UserState();
  const [profileUser, setProfileUser] = useState();
  const [posts, setPosts] = useState([]);
  const [buttonFlag, setButtonFlag] = useState(false);
  const [followUnFollow, setFollowUnFollow] = useState({
    text: "Follow",
    color: "#2abd6e",
  });
  const [pop, setPop] = useState(false);
  const [postPop, setPostPop] = useState(false);
  const [postData, setPostData] = useState();
  const [follow, setFollow] = useState(false);
  const [unFollow, setUnFollow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const getUser = async () => {
    setIsLoading(true);
    let userData = await getCurrentUser();
    console.log(userData);
    if (uname && userData.username === uname) {
      setUser(userData);
      setButtonFlag(true);
      setProfileUser(userData);
      let po = await getUsersPost(userData._id);
      // let data = await getUrlSearchedUser(uname);

      setPosts(po);
     
    } else if (uname) {
    
      console.log(userData);
      let data = await getUrlSearchedUser(uname);

      setProfileUser(data);

      if (data.follower.includes(userData._id)) {
        setFollowUnFollow({
          text: "Unfollow",
          color: "red",
        });
      } else {
        setFollowUnFollow({
          text: "Follow",
          color: "#2abd6e",
        });
      }
      let po = await getUsersPost(data._id);
      setUser(user);
      setPosts(po);
    } else {
      let u = await getCurrentUser();
      console.log(u);
      setProfileUser(u);
      let po = await getUsersPost(userData._id);
      setUser(userData);
      setPosts(po);
    }
    setIsLoading(false)
    console.log(profileUser);
  };

  const followHandle = async () => {
    let value = followUnFollow.text.toLowerCase();
    const data = await doFollowUnFollow(value, profileUser._id);
    if (data.result) {
      await getUser();
      if (value == "follow") {
        setFollow(true);
      } else {
        setUnFollow(true);
      }
    }
  };
  useEffect(() => {
    console.log(uname);
    getUser();
    // getPosts();
  }, [uname]);

  useEffect(() => {
    getUser();
  }, [pop, postPop]);

  useEffect(() => {
    let tkn = localStorage.getItem("user");
    if (!tkn) {
      navigate("/");
    }
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
       {isLoading?
      <LinearProgress color="success" style={{marginBottom:5}} />:""
      }
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
                  color: followUnFollow.color,
                  borderColor: followUnFollow.color,
                  fontWeight: "600",
                }}
                onClick={followHandle}
              >
                {followUnFollow.text}
              </Button>
            ) : (
              <Button
                variant="outlined"
                style={{
                  fontWeight: "600",
                }}
                onClick={() => setPop(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
          <div className="posts">
            {posts
              ? posts.map((post) => (
                  <div
                    className="post_imgg"
                    onClick={() => {
                      setPostPop(true);
                      setPostData(post);
                    }}
                  >
                    <img src={post.image} className="img" />
                  </div>
                ))
              : ""}
          </div>
        </div>
      ) : (
        ""
      )}
      {user ? <EditProfile pop={pop} setPop={setPop} user={user} /> : ""}
      {user ? (
        <Post
          postPop={postPop}
          setPostPop={setPostPop}
          profileUser={profileUser}
          postData={postData}
          setPostData={setPostData}
        />
      ) : (
        ""
      )}
      <Snackbar
        open={follow}
        autoHideDuration={1000}
        onClose={() => setFollow(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Followed Successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={unFollow}
        autoHideDuration={1000}
        onClose={() => setUnFollow(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Un-followed Successfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Profile;
