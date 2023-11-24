import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://bug-tracker-zdic.onrender.com',
});

export default instance;
