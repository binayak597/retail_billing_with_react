import axios from 'axios';
import { BASE_API } from '../main';

const token = localStorage.getItem("token");

export const createOrder = async (order) => {

  return await axios.post(`${BASE_API}/orders`, order, {

    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

export const getLatestOrders = async () => {

  return await axios.get(`${BASE_API}/orders/latest`, {

    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

export const deleteOrder = async (orderId) => {

  return await axios.delete(`${BASE_API}/orders/latest/${orderId}`, {

    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}