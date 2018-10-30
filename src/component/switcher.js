import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Dashboard from './home/dashboard';
import Supplier from './supplier/index';
import EditSupplier from './supplier/edit';
import appconfig from '../config/app.config.json';

const Switcher = () => {
    return (
        <Switch>
            <PrivateRoute path = "/dashboard" component = { Dashboard } />
            <PrivateRoute path = "/supplier" component = { Supplier } />
            <PrivateRoute path = "/edit/:id" component = { EditSupplier } />
        </Switch>
    )
}
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render = { props =>
            localStorage.getItem(appconfig.secure_key.token) != null ? 
            (
                <Component {...props} />
            ) :
            (
                <Redirect
                    to = {{
                        pathname: "/",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default Switcher
