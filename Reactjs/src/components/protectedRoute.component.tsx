import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, ...rest }: any) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (localStorage.getItem('user') != null) {
                    return <Component {...rest} />;
                } else {
                    return <Redirect to="/login" />;
                }
            }}
        />
    );
}
