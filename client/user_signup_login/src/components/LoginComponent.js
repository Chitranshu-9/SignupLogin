import { React, useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import auth from '../helpers/auth_helper';
import { UserStatusContext } from '../helpers/Context';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(props) {
    const classes = useStyles();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
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

    console.log("email", email);
    console.log("password", password);

    //Login Function
    const loginFormSubmit = async () => {
        let data = new FormData();
        data.append("email", email);
        data.append("password", password);
        // auth.login(() => {
        //     props.history.push('/authRoute')
        // })
        const HTTP = axios.create({
            withCredentials: true
        })
        await HTTP.post('http://localhost:8000/users/login', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(
            res => {

                setalertMsg(`Registered successfully`);
                if (res.status == 200) {
                    setSeverity('success');
                    handleOpenSnackBar();
                    setMsg(res.data.msg);
                    setUserName(res.data.userName);
                    // setopenSnackBar(true);
                    console.log("res data from login", res)
                    auth.login(() => {
                        props.history.push('/authRoute')
                    })


                } else {
                    setSeverity('error');
                    props.history.push('/registerLogin')
                }
                // handleOpenSnackBar();
                // setalertMsg(res.data.msg);

                // console.log("res from login form API", res);

            }
        ).catch(err => {
            setAlertType('error');
            setalertMsg(err.response.data.msg);
            handleOpenBar();
            console.log("err from login form API", err.response);
            props.history.push('/registerLogin')
        });
    }

    //Google Login Function
    const GoogleLoginSubmit = async () => {
        await axios.get('http://localhost:8000/users/google/callback'
        ).then(res => console.log("res from google auth", res)
        ).catch(err => {
            console.log("err from google auth", err);
        })
    }

    // console.log("is Authenticated", auth.isAuthenticated());
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>
                <form className={classes.form} onSubmit={e => e.preventDefault()}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        // onClick={() => {
                        //     auth.login(() => {
                        //         props.history.push('/authRoute')
                        //     })
                        // }}
                        onClick={loginFormSubmit}
                    >
                        Sign In
          </Button>
                    {/* <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        startIcon={<FcGoogle />}
                        onClick={GoogleLoginSubmit}
                    >
                        Sign In With Google
          </Button> */}
                    {/* <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
              </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid> */}
                </form>



            </div>
            <Box mt={8}>
                <Copyright />
                <Snackbar
                    open={openBar}
                    autoHideDuration={2000}
                    onClose={handleCloseBar}
                >
                    <Alert severity={alertType} variant="filled" onClick={handleCloseBar}>
                        {alertMsg}
                    </Alert >
                </Snackbar>
            </Box>
        </Container>
    );
}