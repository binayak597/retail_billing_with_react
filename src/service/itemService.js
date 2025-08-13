import axios from "axios";
import { BASE_API } from "../main";

const token = localStorage.getItem("token")

export const addItem = async (item) => {

  return axios.post(`${BASE_API}/admin/items`, item, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const deleteItem = async (itemId) => {

  return axios.delete(`${BASE_API}/admin/items/${itemId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const fetchItems = async () => {

  return axios.get(`${BASE_API}/items`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}