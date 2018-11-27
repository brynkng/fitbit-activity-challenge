import axios from 'axios';
import {fitbitTokenRenewal} from "./api/fitbit_auth";

const instance = axios.create({
    baseURL: 'https://api.fitbit.com/'
});

setAuthHeader();

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    if (error.response && error.response.data && error.response.data.errors[0].errorType === 'expired_token') {
        console.log('Token Expired - Refreshing token');

        fitbitTokenRenewal().then(r => {
            setAuthHeader();
            instance.request(error.config);
        }).catch(r => Promise.reject(error))
    } else {
        return Promise.reject(error);
    }
});

export function setAuthHeader() {
    const access_token = localStorage.getItem('access-token');

    if (access_token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    }
}

export default instance;