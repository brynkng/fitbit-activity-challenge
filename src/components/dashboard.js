import React, {Component} from "react";
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

class Dashboard extends Component {

    state = {
        zones: [],
        point_system: {
            "Fat Burn": 3,
            "Cardio": 4,
            "Peak": 5
        }
    };

    componentDidMount() {
        let access_token = localStorage.getItem('access-token');

        let headers = {
            'Authorization': `Bearer ${access_token}`
        };

        axios.get(
            `https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json`,
            {headers: headers}
        ).then(r => {
            let zones = r.data['activities-heart'][0].value.heartRateZones;
            this.setState({zones: zones});
        });

        //    cache this data? hourly? at least by minutes
    }

    render() {

        let filteredZones = this.state.zones.filter(z => z.name !== 'Out of Range'),
            zones = filteredZones.map(
                z => <div><strong>{z.name}</strong>: {z.minutes} minutes = {this.state.point_system[z.name] * z.minutes} points</div>
            ),
            totalPoints = filteredZones.reduce((acc, z) => acc + (this.state.point_system[z.name] * z.minutes), 0);

        return (
            <div>
                <h2>Dashboard</h2>

                <p>
                    {zones.length > 0 ? zones : <CircularProgress/>}

                    {zones.length > 0 ? <><strong>Total</strong>: {totalPoints} points</> : null}
                </p>
            </div>
        );
    }
}

export default Dashboard;
