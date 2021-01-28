import React from 'react';
import {useFirebase} from "./Firebase";
import {Redirect, Route} from "react-router-dom";


const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const {isAuth} = useFirebase()
    const auth = isAuth();
    return (
        <Route
            {...rest}
            render={(routeProps) => {
                return auth ? <RouteComponent {...routeProps} /> : <Redirect to={"/login"} />
            }}
        />
    );
}

export default PrivateRoute;