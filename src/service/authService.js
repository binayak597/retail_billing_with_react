import axios from 'axios';
import { BASE_API } from '../main';

export const login = async (data) => {

  return await axios.post(`${BASE_API}/login`, data);
}