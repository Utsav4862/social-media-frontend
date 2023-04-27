import axios from "axios";
import { URL } from "./api";
import { getConfig } from "./config";

export const doLikeUnlikePost = async (id, value) => {
  let config = await getConfig();

  let { data } = await axios.put(`${URL}/post/${value}/${id}`, {}, config);

  return data;
};

export const getUsersPost = async (id) => {
  let config = await getConfig();
  console.log(id);
  let { data } = await axios.get(`${URL}/post/user/${id}`, config);

  return data;
};

export const createPost = async (fd, config) => {
  let { data } = await axios.post(`${URL}/post/create`, fd, config);
  return data;
};
