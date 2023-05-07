import axios from "axios";
import { URL } from "./api";
import { getConfig } from "./config";

export const getCurrentUser = async () => {
  let config = await getConfig();
  let { data } = await axios.get(`${URL}/user/`, config);
  console.log(data);
  return data;
};

export const getUrlSearchedUser = async (uname) => {
  let config = await getConfig();
  let { data } = await axios.get(`${URL}/user/search/${uname}`, config);
  console.log(data);
  return data;
};

export const doFollowUnFollow = async (value, id) => {
  let config = await getConfig();
  let { data } = await axios.put(`${URL}/user/${value}/${id}`, {}, config);
  return data;
};

export const updateDetail = async (payload, config) => {
  let { data } = await axios.post(`${URL}/user/update`, payload, config);
  return data;
};

export const userNameAvail = async (uname) => {
  let config = await getConfig();
  let { data } = await axios.get(`${URL}/user/exist/${uname}`, config);
  return data;
};
