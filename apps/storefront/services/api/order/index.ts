import { AxiosInstance } from "axios";

const BaseURL = "api/order";

type TPaylod = {
  restaurantCode: string;
  branchCode: string;
  tableNumber: number;
  tip: number;
  items: {
    menuItemCode: string;
    quantity: number;
    comment: string;
  }[];
};

export const orderAPI = (axios: AxiosInstance) => ({
  createOrder: async (paylod: TPaylod) => {
    const response = await axios.post(`${BaseURL}/place`, paylod);
    return response.data;
  },
  getOrderDetails: async (orderCode: string) => {
    const response = await axios.get(`${BaseURL}/${orderCode}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ3MzA5Njk0LCJpYXQiOjE3NDcwNTA0OTQsImp0aSI6IjljMGY0YmVkMjlkNTQ5YzQ4OTYyNzA0ZDkxYTczZTg3IiwidXNlcl9pZCI6Mn0.99_TTl91z8bYcs0vtCX37P4aKNg7H-xyuqXLpQ0It0k`,
      },
    });
    return response.data;
  },
});
