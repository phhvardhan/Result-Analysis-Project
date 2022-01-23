import "./app.css";
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from "./pages/dashboard/Dashboard";
// import Login from "./pages/auth/Login";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import NavBarExample from "./components/navbar/Navbar";
import { Provider } from 'react-redux';
import store from './store';
// import Logintest from "./pages/auth/LoginTest";
import Loginpage from "./pages/auth/LoginPage";
import Signup from "./pages/auth/Signup";
import ResetPassword from "./pages/auth/ResetPassword";
import ResetPasswordConfirm from "./pages/auth/ResetPasswordConfirm";
import Activate from "./pages/auth/Activate";
import UploadSem from "./pages/forms/UploadSem";
import BackUpSem from "./pages/forms/BackUpSem";
import Student from "./pages/forms/Student";
function App() {
  return (
    <div className="App">
    <Provider store={store}>
        <Router>
                <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route path="/login"  component={Loginpage}/>
                    <Route exact path='/signup' component={Signup} />
                    <Route path="/reset-password"  component={ResetPassword}/>
                    <Route path="/password/reset/confirm/:uid/:token"  component={ResetPasswordConfirm}/>
                    <Route exact path='/activate/:uid/:token' component={Activate} />
                    <Route exact path='/upload' component={UploadSem} />
                    <Route exact path='/backdata' component={BackUpSem} />
                    <Route exact path='/student' component={Student} />
                </Switch>
        </Router>
    </Provider>
    </div>
  );
}

export default App;
