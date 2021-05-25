import { React, useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FcGoogle } from 'react-icons/fc';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setconfirmPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setlastName] = useState();
    const [alertMsg, setalertMsg] = useState(null);
    const [openSnackBar, setopenSnackBar] = useState(false);
    const [severity, setSeverity] = useState();

    // const { setMsg, setSeverity } = useContext(UserStatusContext);
    // console.log("contxt from main app", setStatus);

    const responseGoogle = async () => {
        console.log("done");
    }

    const handleOpenSnackBar = () => {
        setopenSnackBar(true);
    };

    const handleCloseSnackBar = () => {

        setopenSnackBar(false);
    };

    //signup form subit
    const submitSignupForm = async () => {
        let completeName = firstName + " " + lastName;
        let data = new FormData();
        data.append("name", completeName);
        data.append("email", email);
        data.append("password", password);
        data.append("confirm_password", confirmPassword);

        // handleOpenSnackBar();
        await axios.post('http://localhost:8000/users/register', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(
            res => {

                // setalertMsg(`Registered successfully`); (`Registered successfully`);
                if (res.status == 200) {
                    setSeverity('success');
                } else {
                    setSeverity('error');
                }
                setalertMsg(res.data.msg);
                handleOpenSnackBar();
                console.log("res from signUp form API", res);

            }
        ).catch(err => {
            setSeverity('error');
            setalertMsg(err.response.data.msg);
            handleOpenSnackBar();
            // err.response.status
            console.log("err from create signUp form API", err.response);
        });

        // console.log("form submitted successfully")
    }

    // console.log("email", email);
    // console.log("password", password);
    // console.log("confirm password", confirmPassword);
    // console.log("firstName", firstName);
    // console.log("lastName", lastName);
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form} onSubmit={e => e.preventDefault()} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={(e) => setlastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmpassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmpassword"
                                // autoComplete="current-password"
                                onChange={(e) => setconfirmPassword(e.target.value)}
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid> */}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={submitSignupForm}
                    >
                        Sign Up
          </Button>
                    {/* <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        startIcon={<FcGoogle />}
                    >
                        Sign Up With Google
          </Button> */}

                </form>

            </div>
            <Box mt={5}>
                <Copyright />
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={2000}
                    onClose={handleCloseSnackBar}
                >
                    <Alert severity={severity} variant="filled" onClick={handleCloseSnackBar}>
                        {alertMsg}
                    </Alert >
                </Snackbar>

            </Box>
        </Container>
    );
}
