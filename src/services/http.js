import axios from 'axios';

const API = () => axios.create({baseURL: 'http://ehrwebtest.naiacorp.net/api/'});

export default API;