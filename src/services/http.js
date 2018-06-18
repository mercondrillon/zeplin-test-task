import axios from 'axios';

const API = () => axios.create({baseURL: 'https://ehrwebpreprod.naiacorp.net/api/'});

export default API;