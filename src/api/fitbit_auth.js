import base64url from "base64url";
import axios from "../axios";
import queryString from "query-string";
import {setAuthHeader} from "../axios";

export function fitbitAuthorize(code) {
    const code_verifier = localStorage.getItem('code-verifier');

    if (!code_verifier) return Promise.reject('Refresh token not found');

    const body = {
        client_id: process.env.REACT_APP_FITBIT_CLIENT_ID,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.REACT_APP_HOST}/authenticate`,
        code_verifier: code_verifier
    };

    return sendAuthRequest(body).then(r => setAuthHeader());
}

export function fitbitTokenRenewal() {
    const refresh_token = localStorage.getItem('refresh-token');

    if (!refresh_token) return Promise.reject('Refresh token not found');

    const body = {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
    };

    return sendAuthRequest(body);
}

export function resetFitbitTokens() {
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('access-token');
    localStorage.removeItem('code-verifier');
}

export function createFitbitLoginUrl() {
    const code_verifier = Math.random().toString().replace('.', '').repeat(2) + 'activity-challenge',
        redirect_uri = encodeURIComponent(`${process.env.REACT_APP_HOST}/authenticate`),
        url = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_FITBIT_CLIENT_ID}&redirect_uri=${redirect_uri}&code_challenge=${code_verifier}&code_challenge_method=plain&scope=activity%20heartrate`;

    localStorage.setItem('code-verifier', code_verifier);

    return url;
}

function sendAuthRequest(body) {
    const headers = {
        'Authorization': `Basic ${getEncodedAuthKey()}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    return axios.post(
        'oauth2/token',
        queryString.stringify(body),
        {headers: headers}
    ).then(r => {
        localStorage.setItem('access-token', r.data.access_token);
    });
}

function getEncodedAuthKey() {
    return base64url(`${process.env.REACT_APP_FITBIT_CLIENT_ID}:${process.env.REACT_APP_FITBIT_CLIENT_SECRET}`);
}