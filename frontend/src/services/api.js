import axios from 'axios';

const api = axios.create({
baseURL: 'http://localhost:8140'
});

export default api;