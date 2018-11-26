import React from "react";
import Login from "./login";
import Dashboard from "./dashboard";
import {isLoggedIn} from "../api/fitbit_data";

const Home = props => {
    return (
        <div>
            { isLoggedIn() ? <Dashboard /> : <Login />}
        </div>
    );
};

export default Home;