
import { useState } from 'react';
import './App.css';
import SignupLogin from './pages/SignupLoginPage';
import AccessPage from './pages/AccessPage';
import ProtectedPage from './pages/protectedPage';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserStatusContext } from './helpers/Context';

// /registerLogin
function App() {
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [username, setUserName] = useState(null);
  const [openSnackBar, setopenSnackBar] = useState(false);

  const handleOpenSnackBar = () => {
    setopenSnackBar(true);
  };

  const handleCloseSnackBar = () => {

    setopenSnackBar(false);
  };

  // console.log("context in main app", openSnackBar)
  return (
    <UserStatusContext.Provider value={{
      status, setStatus, msg, setMsg, severity,
      setSeverity, openSnackBar, handleOpenSnackBar, handleCloseSnackBar,
      username, setUserName
    }}>
      <div className="App">
        <Switch>
          <Route exact path='/registerLogin' component={SignupLogin} />
          {/* <Route exact path='/authRoute' component={AccessPage} /> */}
          <ProtectedPage exact path='/authRoute' component={AccessPage} />
          <Redirect to='/registerLogin' />
        </Switch>

      </div>
    </UserStatusContext.Provider>
  );
}

export default App;
