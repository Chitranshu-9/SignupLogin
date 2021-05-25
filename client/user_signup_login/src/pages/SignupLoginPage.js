import { React, useState, useContext } from 'react';
import SignInSide from '../components/LoginComponent';
import SignUp from '../components/SignupComponent';
import GoogleLogin from 'react-google-login';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import auth from '../helpers/auth_helper';
import { UserStatusContext } from '../helpers/Context';

// Styles
const useStyles = makeStyles((theme) => ({
    GoogleSubmit: {
        color: 'white',
        // width: '-webkit-fill-available',
        width: '50%',
        background: 'black',
        justifyContent: 'center',
        margin: '30px'
    }
}));
function SignupLogin(props) {
    const [alertMsg, setalertMsg] = useState(null);
    const [openBar, setOpenBar] = useState(null);
    const [alertType, setAlertType] = useState();

    const handleOpenBar = () => {
        setOpenBar(true);
    };

    const handleCloseBar = () => {

        setOpenBar(false);
    };

    const {
        msg,
        setMsg,
        severity,
        setUserName,
        setSeverity,
        openSnackBar,
        setopenSnackBar,
        handleOpenSnackBar,
        handleCloseSnackBar
    } = useContext(UserStatusContext);


    const responseSuccessGoogle = async (res) => {
        console.log(res.tokenId);
        let data = new FormData();
        data.append("tokenId", res.tokenId);
        const HTTP = axios.create({
            withCredentials: true
        })

        // axios({
        //     method: 'POST',
        //     url: 'http://localhost:8000/users/google',
        //     data: { tokenId: res.tokenId }
        // })

        await HTTP.post('http://localhost:8000/users/google', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if (response.status === 201) {
                console.log("Registered successfully");
                setSeverity('success');

                setMsg(response.data.msg);
                // setUserName(response.data.userName);
                handleOpenSnackBar();
                return props.history.push('/registerLogin')
            }

            setSeverity('success');

            setMsg(response.data.msg);
            setUserName(response.data.userName);
            handleOpenSnackBar();
            auth.login(() => {
                props.history.push('/authRoute')
            })
            console.log(response)
        }).catch(err => {
            setSeverity('error');
            handleOpenSnackBar();
            props.history.push('/registerLogin')
            console.log(err.response)
        })
    }

    //On Failure
    const responseFailureGoogle = (res) => {
        console.log(res);
    }
    // console.log('props in google login', props)
    const classes = useStyles();
    return (
        <>
            <GoogleLogin
                clientId="683542551223-u1uaju15flmio0fmkeduitlgppem6p38.apps.googleusercontent.com"
                buttonText="Login/Signup with Google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseSuccessGoogle}
                cookiePolicy={'single_host_origin'}
                className={classes.GoogleSubmit}
            />
            <div style={{ display: 'flex' }}>
                <SignInSide history={props.history} />

                <SignUp history={props.history} />


            </div>


            <Snackbar
                open={openSnackBar}
                autoHideDuration={2000}
                onClose={handleCloseSnackBar}
            >
                {/* severity={severity} */}
                <Alert severity={severity} variant="filled" onClick={handleCloseSnackBar}>
                    {msg}
                </Alert >
            </Snackbar>
        </>
    );
}

export default SignupLogin;