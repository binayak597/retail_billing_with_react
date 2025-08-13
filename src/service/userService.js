import axios from "axios";
import { BASE_API } from "../main";

const token = localStorage.getItem("token");

export const addUser = async (user) => {

  return axios.post(`${BASE_API}/admin/register`, user, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const deleteUser = async (userId) => {

  return axios.delete(`${BASE_API}/admin/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const fetchUsers = async () => {

  return axios.get(`${BASE_API}/admin/users`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}