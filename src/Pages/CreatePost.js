import { Box, Button, Modal, Typography, LinearProgress } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import React, { useEffect, useState } from "react";
import "./create.css";
import { getTkn } from "../Func/getToken";
import { createPost } from "../API/postsApi";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [open, setOpen] = useState(false);
  const [imageData, setImageData] = useState();
  const [preview, setPreview] = useState();
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    maxHeight: 750,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    borderRadius: "15px",
    boxShadow: 24,
    overflow: "hidden",
    overflowY: "scroll",
    textAlign: "center",
    p: 4,
  };

  const handleFileInput = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImageData(undefined);
      return;
    }
    setImageData(e.target.files[0]);
  };

  const post = async () => {
    setIsLoading(true);
    let fd = new FormData();
    fd.append("file", imageData);
    fd.append("caption", caption);

    let tkn = await getTkn();

    let config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${tkn}`,
      },
    };

    let data = await createPost(fd, config);
    console.log(data);

    if (data.length !== 0) {
      navigate("/home");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!imageData) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(imageData);
    console.log(objectUrl);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageData]);
  useEffect(() => {
    let tkn = localStorage.getItem("user");
    if (!tkn) {
      navigate("/");
    }
    handleOpen();
  }, []);

  return (
    <Modal open={open}>
      <Box sx={style}>
        {isLoading ? <LinearProgress color="success" /> : ""}
        <div className="modal_header">
          <CancelIcon
            onClick={() => navigate("/home")}
            style={{
              cursor: "pointer",
              position: "absolute",
              left: 15,
              top: 5,
              marginBottom: 52,
            }}
          />
          <h2 style={{ marginBottom: 20 }}>Add a Post</h2>
          <Button
            variant="outlined"
            component="label"
            style={{ fontWeight: "600" }}
          >
            {imageData ? "Change Picture" : "Select Picture"}
            <input
              type="file"
              accept="image/png, image/jpeg"
              hidden
              onChange={handleFileInput}
            />
          </Button>
        </div>
        {imageData ? (
          <div style={{ width: "100%", height: "80%" }}>
            <img
              src={preview}
              style={{ objectFit: "contain", width: "100%", height: "70%" }}
            />
          </div>
        ) : (
          ""
        )}

        {imageData ? (
          <>
            <textarea
              cols="20"
              rows="5"
              placeholder="Write a Caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
            <Button
              variant="outlined"
              style={{
                fontWeight: "600",
                fontSize: 18,
                color: "#fff",
                backgroundColor: "#2abd6e",
                width: "95%",
              }}
              disabled={isLoading}
              onClick={post}
            >
              Post
            </Button>
          </>
        ) : (
          ""
        )}
        <br />
      </Box>
    </Modal>
  );
}

export default CreatePost;
