import axios from "axios";

const token = localStorage.getItem("token");

export const addUser = async (user) => {

  return axios.post("http://localhost:5454/api/v1.0/admin/register", user, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const deleteUser = async (userId) => {

  return axios.delete(`http://localhost:5454/api/v1.0/admin/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const fetchUsers = async () => {

  return axios.get("http://localhost:5454/api/v1.0/admin/users", {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}