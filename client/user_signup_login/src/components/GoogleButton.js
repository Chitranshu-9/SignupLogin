import React from 'react';
import GoogleLogin from 'react-google-login';

function GoogleButton(props) {

    // responseGoogle
    const responseGoogle = async () => {
        console.log("done");
    }
    return (
        <>

            <GoogleLogin
                // clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                // buttonText="Login"
                // onSuccess={responseGoogle}
                // onFailure={responseGoogle}
                // cookiePolicy={'single_host_origin'}
                // className={props.className}
                // style={{ width: 500 }}
                {...props}
            />
        </>
    );
}

export default GoogleButton;