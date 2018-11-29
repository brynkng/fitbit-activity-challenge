import React from "react";
import Login from "./login";
import Dashboard from "./dashboard";
import {isLoggedIn} from "../api/fitbit_data";
import {withRouter} from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import {Notifier} from "./notifier";


class Home extends React.Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.state && nextProps.location.state.error) {
            this.showError(nextProps.location.state.error);
        }
    }

    state = {
        open: false,
        snackbar_variant: 'success',
        snackbar_message: ''
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open: false});
    };

    showError = (error) => {
        this.setState({open: true, snackbar_variant: 'error', snackbar_message: error});
    };

    render() {
        return (
            <div>
                {isLoggedIn() ? <Dashboard showError={this.showError}/> : <Login/>}

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                >
                    <Notifier
                        onClose={this.handleClose}
                        variant={this.state.snackbar_variant}
                        message={this.state.snackbar_message}
                    />
                </Snackbar>
            </div>
        );
    }
};

export default withRouter(Home);