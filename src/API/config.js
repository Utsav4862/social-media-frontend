import { getTkn } from "../Func/getToken";

export const getConfig = async () => {
  let tkn = await getTkn();
  return {
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${tkn}`,
    },
  };
};
