import React from 'react';
import {useFirebase} from "./Firebase";
import {Redirect, Route} from "react-router-dom";


const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const {user} = useFirebase()
    console.log('PrivateRouter, user:', user);
    return (
        <Route
            {...rest}
            render={(routeProps) => {
                return user ? <RouteComponent {...routeProps} /> : <Redirect to={"/login"} />
            }}
        />
    );
}

export default PrivateRoute;