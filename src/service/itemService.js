import axios from "axios";

const token = localStorage.getItem("token")

export const addItem = async (item) => {

  return axios.post("http://localhost:5454/api/v1.0/admin/items", item, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const deleteItem = async (itemId) => {

  return axios.delete(`http://localhost:5454/api/v1.0/admin/items/${itemId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const fetchItems = async () => {

  return axios.get("http://localhost:5454/api/v1.0/items", {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}