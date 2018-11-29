import axios from "../axios";

// export function getHeartRate() {
//     return axios.get(
//         '1/user/-/activities/heart/date/today/1d.json'
//     );
// }

export function getTodaysActivities() {

}

export function getActivities() {
    return axios.get(
        `/1/user/-/activities/date/today.json`
    ).then(r => {
        return {
            zones: r.data.summary.heartRateZones,
            active_minutes: r.data.summary.fairlyActiveMinutes + r.data.summary.veryActiveMinutes
        }
    });
}

function getTimeSeriesActivities(activity, date, period) {
    return axios.get(
        `/1/user/-/activities/tracker/${activity}/date/${date}/${period}.json`
    )
}

export function isLoggedIn() {
    return !!localStorage.getItem('access-token');
}

export function getFriends() {

}