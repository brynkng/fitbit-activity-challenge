import React from "react";
// import CryptoJS from 'crypto-js';
import Button from '@material-ui/core/Button';

const Login = props => {
    const code_verifier =  Math.random().toString().replace('.', '').repeat(2) + 'activity-challenge',
        redirect_uri = encodeURIComponent(`${process.env.REACT_APP_HOST}/authenticate`),
        url = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_FITBIT_CLIENT_ID}&redirect_uri=${redirect_uri}&code_challenge=${code_verifier}&code_challenge_method=plain&scope=activity%20heartrate`;

    localStorage.setItem('code-verifier', code_verifier);

    return (
        <div>
            <a href={url}>
                <Button variant="contained" color="primary">LOGIN</Button>
            </a>
        </div>
    );
};

export default Login;
