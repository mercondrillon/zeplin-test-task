import axios from 'axios';

const API = () => axios.create({baseURL: 'ehrwebtest.naiacorp.net/api/'});

export default API;