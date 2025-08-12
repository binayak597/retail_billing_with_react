import axios from "axios";

const token = localStorage.getItem("token");

export const createRazorpayOrder = async (data) => {

  return await axios.post("http://localhost:5454/api/v1.0/payments/create-order", data, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

export const verifyPayment = async (data) => {

  return await axios.post("http://localhost:5454/api/v1.0/payments/verify", data, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}