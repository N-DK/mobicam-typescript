import axios from 'axios';

const request = axios.create({
    baseURL: 'https://checkapp.midvietnam.com/v2/',
});

export const get = async (path: string, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export default request;
