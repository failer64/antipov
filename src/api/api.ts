import axios from "axios";

export const instance = axios.create({
  baseURL: "https://reqres.in/api/",
  headers: {
    "Content-type": "application/json",
  },
});
