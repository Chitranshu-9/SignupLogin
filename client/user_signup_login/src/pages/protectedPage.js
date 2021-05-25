import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../helpers/auth_helper';

function ProtectedPage({ component: Component, ...rest }) {
    console.log("is Authenticated", auth.isAuthenticated());
    return (
        <div>
            <Route {...rest} render={
                (props) => {
                    if (auth.isAuthenticated() == true) {

                        return <Component {...props} />
                    } else {
                        return <Redirect to='/registerLogin'
                        />
                    }
                }
            } />
        </div>
    );
}

export default ProtectedPage;