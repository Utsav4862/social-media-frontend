import { Avatar, Box, Button, Modal, TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import React, { useEffect, useRef, useState } from "react";
import { Edit } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import "./comp.css";
import { getCurrentUser, updateDetail, userNameAvail } from "../API/userApi";
import { getTkn } from "../Func/getToken";
import { useNavigate } from "react-router-dom";

function EditProfile({ pop, setPop, user }) {
  const navigate = useNavigate();
  const [updateImage, setUpdateImage] = useState();
  const [preview, setPreview] = useState();
  const [uname, setUname] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [usernameError, setUsernameError] = useState(false);

  const inpRef = useRef();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      lg: 500,
      md: 400,
      xs: 250,
    },
    bgcolor: "background.paper",
    // border: "2px solid #000",
    // borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };

  const handleUpdateImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setUpdateImage(undefined);
      return;
    }
    console.log(e.target.files[0]);
    setUpdateImage(e.target.files[0]);
  };

  const update = async () => {
    let fd = new FormData();
    if (name != "" && uname != "") {
      fd.append("username", uname);
      fd.append("name", name);
    }

    if (updateImage) {
      fd.append("file", updateImage);
    }
    let tkn = await getTkn();
    let config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${tkn}`,
      },
    };

    const data = await updateDetail(fd, config);
    if (data.result) {
      user = await getCurrentUser();
      setPop(false);
      //   navigate("/profile/");
    }
  };

  useEffect(() => {
    if (!updateImage) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(updateImage);
    console.log(objectUrl);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [updateImage]);

  const checkUserName = async (uname) => {
    let data = await userNameAvail(uname);
    if (data.error) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (uname != "") {
        checkUserName(uname);
      }
    }, 100);
  }, [uname]);
  return (
    <Modal
      open={pop}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CancelIcon
          onClick={() => setPop(false)}
          style={{
            cursor: "pointer",
            position: "absolute",
            right: 15,
            top: 10,
          }}
        />
        <div className="edit_wrapper">
          <h2>Edit Profile</h2>
          <div className="edit_pic">
            <Avatar
              src={preview ? preview : user.profile_img}
              sx={{ width: 100, height: 100 }}
            />
            <h5
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => inpRef.current.click()}
            >
              {" "}
              <Edit fontSize="12" /> Change Profile Picture{" "}
              <input
                type="file"
                accept="image/png, image/jpeg"
                ref={inpRef}
                hidden
                onChange={handleUpdateImage}
              />
            </h5>
          </div>
          <div style={{ width: "100%" }}>
            <p>Name: </p>
            <input
              value={name}
              className="edit_inp"
              style={{ marginBottom: 20 }}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div style={{ width: "100%" }}>
            <p>Username: </p>
            <input
              value={uname}
              className="edit_inp"
              onChange={(e) => setUname(e.target.value)}
            />
            {usernameError && uname != "" ? (
              <h5 style={{ color: "red", marginTop: 5 }}>
                Username not available
              </h5>
            ) : uname != "" ? (
              <h5 style={{ color: "green", marginTop: 5 }}>
                Username available
              </h5>
            ) : (
              ""
            )}
          </div>

          <Button
            variant="contained"
            fullWidth
            style={{
              backgroundColor: "#2abd6e",
              fontWeight: 600,
              height: 50,
              marginTop: 27,
            }}
            onClick={update}
          >
            {" "}
            Update Detail{" "}
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default EditProfile;
