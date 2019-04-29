import axios from "axios";

const serverURL = "http://localhost:3006";

export const getRequest = async (path = "/", token = "") => {
  const config = {
    method: "get",
    baseURL: serverURL,
    url: path,
    headers: { "x-auth-token": token },
    params: {},
    timeout: 5000
  };
  const res = await createRequest(config);
  return res;
};

export const postRequest = async (path = "/", token = "", reqData = {}) => {
  const config = {
    method: "post",
    baseURL: serverURL,
    url: path,
    headers: { "x-auth-token": token },
    params: {},
    data: reqData,
    timeout: 5000
  };
  const res = await createRequest(config);
  return res;
};

export const putRequest = async (path = "/", token = "", reqData = {}) => {
  const config = {
    method: "put",
    baseURL: serverURL,
    url: path,
    headers: { "x-auth-token": token },
    params: {},
    data: reqData,
    timeout: 5000
  };
  const res = await createRequest(config);
  return res;
};

export const deleteRequest = async (path = "/", token = "") => {
  const config = {
    method: "delete",
    baseURL: serverURL,
    url: path,
    headers: { "x-auth-token": token },
    params: {},
    timeout: 5000
  };
  const res = await createRequest(config);
  return res;
};

function createRequest(config) {
  console.log("Create Request config obj: ", config);
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios(config);
      console.log("AXIOS Response:", res);
      resolve(res);
    } catch (error) {
      if (error.response) {
        reject(error.response);
      } else if (error.request) {
        reject(error.request);
      } else {
        reject(error.message);
      }
    }
  });
}
