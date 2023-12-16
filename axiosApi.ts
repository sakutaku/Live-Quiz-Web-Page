import axios from "axios";

const axiosApi = axios.create({
    baseURL: 'https://js-course-18-87cf5-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default axiosApi;