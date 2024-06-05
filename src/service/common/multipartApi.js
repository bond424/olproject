import axios from 'axios';

const multiApi = (baseUrl) =>
    axios.create({
        baseURL: baseUrl,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

export default multiApi;
