import { React, useState, useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import { UserStatusContext } from '../helpers/Context';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '50%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function AccesssPage(props) {
    const classes = useStyles();
    // oldPassword, newPassword, confirmNewPassword
    const [oldPassword, SetoldPassword] = useState(null);
    const [newPassword, SetnewPassword] = useState(null);
    const [confirmNewPassword, SetconfirmNewPassword] = useState(null);

    const {
        msg,
        setMsg,
        username,
        severity,
        setSeverity,
        openSnackBar,
        setopenSnackBar,
        handleOpenSnackBar,
        handleCloseSnackBar
    } = useContext(UserStatusContext);

    const LogoutFunc = async () => {

        await axios({
            method: 'POST',
            url: 'http://localhost:8000/users/logout',
        }).then(res => {
            console.log("res from logOut route", res);
            setSeverity('success');
            setMsg(res.data.msg);
            handleOpenSnackBar();
            return props.history.push('/registerLogin')
        }).catch(err => {
            setSeverity('error');
            setMsg(err.response.data.msg)
            console.log("err from logOut route", err);
        })
    };

    const changePasswordFunc = async () => {
        let data = new FormData();
        data.append("oldPassword", oldPassword);
        data.append("newPassword", newPassword);
        data.append("confirmNewPassword", confirmNewPassword);
        const HTTP = axios.create({
            withCredentials: true
        })
        await HTTP.post('http://localhost:8000/users/changePassword', data).then(res => {
            setSeverity('success');
            setMsg(res.data.msg);
            handleOpenSnackBar();
            console.log("res from logOut route", res);
        }).catch(err => {
            setSeverity('error');
            setMsg(err.response.data.msg);
            handleOpenSnackBar();
            console.log("err from logOut route", err.response);
        })
    }
    console.log("password details", oldPassword, newPassword, confirmNewPassword);
    console.log("context from access page", msg, severity, openSnackBar, username);
    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Welcome {username}
            </Typography>

            <form className={classes.form} onSubmit={e => e.preventDefault()}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Old Password"
                    name="email"
                    // autoComplete="email"
                    autoFocus
                    onChange={(e) => SetoldPassword(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="New Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => SetnewPassword(e.target.value)}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Confirm Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => SetconfirmNewPassword(e.target.value)}
                />
            </form>
            <Button
                className={classes.submit}
                type="submit"
                color="primary"
                variant="contained"
                onClick={changePasswordFunc}
            >Change Password</Button>
            <Button
                type="submit"
                color="secondary"
                variant="contained"
                onClick={LogoutFunc}
            >Log Out</Button>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={2000}
                onClose={handleCloseSnackBar}
            >
                <Alert severity={severity} variant="filled" onClick={handleCloseSnackBar}>
                    {msg}
                </Alert >
            </Snackbar>
        </div>
    );
}

export default AccesssPage;