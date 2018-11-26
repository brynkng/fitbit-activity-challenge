import axios from "../axios";

export function getHeartRate() {
    return axios.get(
        `1/user/-/activities/heart/date/today/1d.json`
    );
}

export function isLoggedIn() {
    return !!localStorage.getItem('access-token');
}