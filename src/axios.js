import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://us-central1-clone-6e7c0.cloudfunctions.net/api'
    // 'http://localhost:5001/clone-6e7c0/us-central1/api'
});

export default instance;