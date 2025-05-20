import { AxiosInstance } from "axios";

const authURL = "/api/authorization";

type TloginPayload = {
  username: string;
  password: string;
};

export const authAPI = (axios: AxiosInstance) => ({
  login: async (payload: TloginPayload) => {
    const response = await axios.post(`${authURL}/login`, payload);
    return response.data;
  },
  getUser: async () => {
    const response = await axios.get(`${authURL}/user`);
    return response.data;
  },
});
