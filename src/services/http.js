import axios from 'axios';

const API = (baseURL) => axios.create({baseURL: baseURL || 'https://ehrwebpreprod.naiacorp.net/api/'});

export default API;