import React from "react";
import Login from "./login";
import Dashboard from "./dashboard";

const Home = props => {
    let loggedIn = localStorage.getItem('access-token');

    return (
        <div>
            { loggedIn ? <Dashboard /> : <Login />}
        </div>
    );
};


export default Home;
