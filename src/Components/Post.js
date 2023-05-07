import { Alert, Box, Modal, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import { doDelete, doLikeUnlikePost } from "../API/postsApi";
import { UserState } from "../Context/user";
import { DeleteForeverRounded, Polyline } from "@mui/icons-material";
import { AiFillDelete } from "react-icons/ai";

function Post({ postPop, setPostPop, profileUser, postData, setPostData }) {
  const { user } = UserState();
  const [deleted, setDeleted] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      lg: 900,
      md: 400,
      xs: 250,
    },
    bgcolor: "background.paper",
    // border: "2px solid #000",
    // maxHeight: 750,
    boxShadow: 24,
    // p: 4,
  };

  const likeUnlikePost = async (id, value) => {
    const data = await doLikeUnlikePost(id, value);
    setPostData(data);
  };

  const deletePost = async (id) => {
    const data = await doDelete(id);
    if (data.success) {
      setDeleted(true);
      setPostPop(false);
    } else {
      setDeleted(false);
      console.log("error");
    }
  };

  useEffect(() => {
    console.log(postData);
  }, []);
  return (
    <>
      <Modal
        open={postPop}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CancelIcon
            onClick={() => setPostPop(false)}
            style={{
              cursor: "pointer",
              position: "absolute",
              right: 15,
              top: 10,
            }}
          />

          <div className="post_wrapper">
            <div style={{ width: "50%", height: "100%" }}>
              {postData ? (
                <div className="" style={{ width: "100%" }}>
                  <img
                    src={postData.image}
                    style={{
                      objectFit: "contain",
                      // transform: "scale(1.1)",
                      width: "100%",
                      height: "100%",
                    }}
                    className=""
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <div style={{ width: "50%" }}>
              <div className="reaction_banner" style={{ marginLeft: 10 }}>
                {postData ? (
                  postData.likes.includes(user._id) ? (
                    <BsFillHandThumbsUpFill
                      size={30}
                      color="#2abd6e"
                      onClick={() => likeUnlikePost(postData._id, "unlike")}
                    />
                  ) : (
                    <BsHandThumbsUp
                      size={30}
                      onClick={() => likeUnlikePost(postData._id, "like")}
                    />
                  )
                ) : (
                  ""
                )}
              </div>
              <h4 style={{ marginLeft: "10px" }}>
                {postData ? postData.likes.length : ""} likes
              </h4>
              <div className="caption">
                <h4 style={{ marginLeft: "10px", marginRight: 5 }}>
                  {profileUser ? profileUser.username : "ada"}
                </h4>
                <p>{postData ? postData.caption : ""}</p>
              </div>

              {user && profileUser && user._id === profileUser._id ? (
                <AiFillDelete
                  size={25}
                  style={{
                    color: "red",
                    position: "absolute",
                    right: 10,
                    bottom: 10,
                    cursor: "pointer",
                  }}
                  onClick={() => deletePost(postData._id)}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </Box>
      </Modal>
      <Snackbar open={deleted} autoHideDuration={6000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Post Deleted Successfully
        </Alert>
      </Snackbar>
    </>
  );
}

export default Post;
