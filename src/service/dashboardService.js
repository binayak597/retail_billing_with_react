import axios from 'axios';

const token = localStorage.getItem("token");

export const fetchDashboardData = async () => {

  return await axios.get("http://localhost:5454/api/v1.0/dashboard", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}