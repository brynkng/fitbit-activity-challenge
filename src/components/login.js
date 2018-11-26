import React from "react";
// import CryptoJS from 'crypto-js';
import Button from '@material-ui/core/Button';
import {createFitbitLoginUrl} from "../api/fitbit_auth";

const Login = props => {
    return (
        <div>
            <a href={createFitbitLoginUrl()}>
                <Button variant="contained" color="primary">LOGIN</Button>
            </a>
        </div>
    );
};

export default Login;
