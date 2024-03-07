import { instance } from "./api";

export const usersApi = {
  async getUsers(page: number) {
    const response = await instance.get(`users?page=${page}`);
    return response.data;
  },
};
