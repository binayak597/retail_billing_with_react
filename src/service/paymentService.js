import axios from "axios";
import { BASE_API } from "../main";

const token = localStorage.getItem("token");

export const createRazorpayOrder = async (data) => {

  return await axios.post(`${BASE_API}/payments/create-order`, data, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

export const verifyPayment = async (data) => {

  return await axios.post(`${BASE_API}/payments/verify`, data, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}