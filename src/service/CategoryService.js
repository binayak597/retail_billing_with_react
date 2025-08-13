import axios from 'axios';
import { BASE_API } from '../main';

const token = localStorage.getItem("token");

export const addCategory = async (category) => {

  return await axios.post('http://localhost:5454/api/v1.0/admin/categories', category, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const deleteCategory = async (categoryId) => {

  return await axios.delete(`http://localhost:5454/api/v1.0/admin/categories/${categoryId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const fetchCategories = async () => {

  return await axios.get(`${BASE_API}/categories`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}