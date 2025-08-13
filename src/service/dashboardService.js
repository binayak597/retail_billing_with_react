import axios from 'axios';
import { BASE_API } from '../main';

const token = localStorage.getItem("token");

export const fetchDashboardData = async () => {

  return await axios.get(`${BASE_API}/dashboard`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}