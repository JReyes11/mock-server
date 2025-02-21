import axios from "axios";

export const params = async function () {
  return {
    baseUrl: "http://localhost:3000",
    users: "/users",
    orders: "/orders",
    products: "/products",
  };
};

export const getConfig = async function (endpoint) {
  return {
    method: "GET",
    url: endpoint,
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const postConfig = async function (endpoint, data) {
  return {
    method: "POST",
    url: endpoint,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
};

export const makeRequest = async function (headers) {
  try {
    return await axios(headers).then(function (response) {
      return response;
    });
  } catch (e) {
    return e.response;
  }
};
