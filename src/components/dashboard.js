import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {getHeartRate} from "../api/fitbit_data";
import CircularProgress from '@material-ui/core/CircularProgress';
import {resetFitbitTokens} from "../api/fitbit_auth";

class Dashboard extends Component {

    state = {
        zones: [],
        point_system: {
            "Fat Burn": .5,
            "Cardio": 3,
            "Peak": 6
        }
    };

    componentDidMount() {
        getHeartRate().then(r => {
            let zones = r.data['activities-heart'][0].value.heartRateZones;
            this.setState({zones: zones});
        }).catch(error => {
            resetFitbitTokens();
            this.props.history.push('/', {error: error.toString()});
        });
    }

    render() {

        let filteredZones = this.state.zones.filter(z => z.name !== 'Out of Range'),
            zones = filteredZones.map(
                z => <div key={z.name}><strong>{z.name}</strong>: {z.minutes} minutes = {this.state.point_system[z.name] * z.minutes} points</div>
            ),
            totalPoints = filteredZones.reduce((acc, z) => acc + (this.state.point_system[z.name] * z.minutes), 0);

        return (
            <div>
                <h2>Dashboard</h2>

                <section>
                    {zones.length > 0 ? zones : <CircularProgress/>}

                    {zones.length > 0 ? <><strong>Total</strong>: {totalPoints} points</> : null}
                </section>
            </div>
        );
    }
}

export default withRouter(Dashboard);
