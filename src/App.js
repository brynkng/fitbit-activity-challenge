import React, {Component} from 'react';
import './App.css';

import { Route, Switch } from "react-router-dom";
import Auth from './components/auth';
import Home from './components/home';
import { BrowserRouter } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';


class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <main>
                    <CssBaseline />

                    <h1>FitBit Activity Challenge</h1>

                    <Switch>
                        <Route path="/authenticate" component={Auth}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                </main>
            </BrowserRouter>
        );
    }
}

export default App;
