import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {getHeartRate, getActivities} from "../api/fitbit_data";
import CircularProgress from '@material-ui/core/CircularProgress';
import {resetFitbitTokens} from "../api/fitbit_auth";

class Dashboard extends Component {

    state = {
        zones: [],
        active_minutes: 0,
        active_modifier: 2,
        hr_point_system: {
            "Cardio": 1,
            "Peak": 2
        }
    };

    componentDidMount() {

        getActivities().then(r => {
            // debugger
            this.setState({zones: r.zones, active_minutes: r.active_minutes});
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                resetFitbitTokens();
                this.props.history.push('/', {error: error.toString()});
            } else {
                this.props.showError(error.toString())
            }
        });
    }

    render() {

        let filtered_zones = this.state.zones.filter(z => ['Cardio', 'Peak'].includes(z.name)),
            zones = filtered_zones.map(
                z => <div key={z.name}><strong>{z.name}</strong>: {z.minutes} minutes = {this.state.hr_point_system[z.name] * z.minutes} points</div>
            ),
            total_points = filtered_zones.reduce((acc, z) => acc + (this.state.hr_point_system[z.name] * z.minutes), 0),
            active_points = this.state.active_minutes * this.state.active_modifier;

        total_points += active_points;

        return (
            <div>
                <h2>Dashboard</h2>

                <section>
                    {zones.length > 0 ? <><strong>Active Minutes: </strong>{this.state.active_minutes} = {active_points} points</> : null}

                    {zones.length > 0 ? zones : <CircularProgress/>}

                    {zones.length > 0 ? <><strong>Total</strong>: {total_points} points</> : null}
                </section>
            </div>
        );
    }
}

export default withRouter(Dashboard);
