import React from "react";
import {
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import MapPage from './pages/MapPage';
import SensorPage from './pages/SensorPage'

const Routes: React.FC = () => {

    return (
        <Switch>
            <Route exact path='/' component={MapPage} />
            <Route exact path="/sensor/:id" component={SensorPage} />
            <Redirect to='/' />
        </Switch>
    )
}

export default Routes