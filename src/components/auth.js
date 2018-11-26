import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import queryString from 'query-string';
import axios from 'axios';
import base64url from 'base64url';

class Auth extends Component {

    state = {
        message: "Authorizing..."
    };

    componentDidMount() {
        let params = queryString.parse(this.props.location.search),
            code_verifier = localStorage.getItem('code-verifier');

        if (params.code && params.code.length > 0 && code_verifier) {

            let auth_key = `${process.env.REACT_APP_FITBIT_CLIENT_ID}:${process.env.REACT_APP_FITBIT_CLIENT_SECRET}`,
                encoded_auth_key = base64url(auth_key),
                headers = {
                    'Authorization': `Basic ${encoded_auth_key}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                };

            axios.post(
                'https://api.fitbit.com/oauth2/token',
                queryString.stringify({
                    client_id: process.env.REACT_APP_FITBIT_CLIENT_ID,
                    code: params.code,
                    grant_type: 'authorization_code',
                    redirect_uri: `${process.env.REACT_APP_HOST}/authenticate`,
                    code_verifier: code_verifier
                }),
                {headers: headers}
            ).then(r => {

                localStorage.setItem('access-token', r.data.access_token);
                this.props.history.push('/');
            }).catch(error => {
                this.setState({message: "Error: " + JSON.stringify(error.response.data.errors)})
            });

        } else {
            this.setState({message: 'FitBit authorization is required to use app.'})
        }
    }


    render() {
        return (
            <>{this.state.message}</>
        );
    }
};

export default withRouter(Auth);
