import axios from 'axios';

const token = localStorage.getItem("token");

export const createOrder = async (order) => {

  return await axios.post("http://localhost:5454/api/v1.0/orders", order, {

    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

export const getLatestOrders = async () => {

  return await axios.get("http://localhost:5454/api/v1.0/orders/latest", {

    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

export const deleteOrder = async (orderId) => {

  return await axios.delete(`http://localhost:5454/api/v1.0/orders/latest/${orderId}`, {

    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}