import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import queryString from 'query-string';
import {fitbitAuthorize} from "../api/fitbit_auth";

class Auth extends Component {

    state = {
        message: "Authorizing..."
    };

    componentDidMount() {
        let params = queryString.parse(this.props.location.search);

        if (params.code && params.code.length > 0) {
           fitbitAuthorize(params.code).then(r => {
                this.props.history.push('/');
            }).catch(error => {
                if (error.response && error.response.data) {
                    error = error.response.data.errors
                }

                this.setState({message: "Error: " + JSON.stringify(error)})
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
