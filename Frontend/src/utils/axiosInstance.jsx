import axios from 'axios'
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 10000,
})

axiosInstance.interceptors.response.use(
    response => response.data,
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    console.error('Bad Request:', error.response.data.message || error.message);
                    break;
                case 401:
                    console.error('Unauthorized:', error.response.data.message || error.message);
                    break;
                case 404:
                    console.error('Not Found:', error.response.data.message || error.message);
                    break;
                case 500:
                    console.error('Server Error:', error.response.data.message || error.message);
                    break;
                default:
                    console.error('Error:', error.response.data.message || error.message);
            }
        } else if (error.request) {
            console.error('No response from server:', error.message);
        } else {
            console.error('Request error:', error.message);
        }
        return Promise.reject(error);
    }
)
export default axiosInstance
