import { instance } from "./api";

export const authAPI = {
  async register(email: string, password: string) {
    const response = await instance.post("register", {
      email,
      password,
    });
    return response.data;
  },
  async login(email: string, password: string) {
    const response = await instance.post("login", {
      email,
      password,
    });
    return response.data;
  },
};
