import { React, useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { UserStatusContext } from '../helpers/Context';

function accessablePage(props) {
    const [alertText, setAlertText] = useState();
    const [alertType, setAlertType] = useState();
    const [openBar, setOpenBar] = useState(false);

    const {
        msg,
        severity,
        openSnackBar,

    } = useContext(UserStatusContext);



    useEffect(() => {
        console.log("accessablePage snackbar function", openSnackBar, severity, msg);
        setAlertText(msg);
        setAlertType(severity);
        if (msg != null || msg != undefined) {
            handleOpenSnackBar();
        }
    }, []);

    const handleOpenSnackBar = () => {
        setOpenBar(true);
    };

    const handleCloseSnackBar = () => {

        setOpenBar(false);
    };


    return (
        <div>
            <h1>me</h1>
            <Snackbar
                open={openBar}
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

export default accessablePage;