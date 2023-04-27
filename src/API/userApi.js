import axios from "axios";
import { URL } from "./api";
import { getConfig } from "./config";

export const getCurrentUser = async () => {
  let config = await getConfig();
  let { data } = await axios.get(`${URL}/user/`, config);
  return data;
};

export const getUrlSearchedUser = async (uname) => {
  let config = await getConfig();
  let { data } = await axios.get(`${URL}/user/search/${uname}`, config);
  console.log(data);
  return data;
};
