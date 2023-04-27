export const getTkn = async () => {
  let tkn = await localStorage.getItem("user");
  return tkn;
};
