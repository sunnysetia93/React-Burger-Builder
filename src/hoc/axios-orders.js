import axios from 'axios';
import firebaseURL from '../assets/config/dev'

const instance = axios.create({
    baseURL:firebaseURL.axiosOrdersDB
});

export default instance;