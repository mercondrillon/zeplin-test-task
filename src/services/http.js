import axios from 'axios';

const API = () => axios.create({baseURL: 'https://ehrwebtest.naiacorp.net/api/'});

export default API;