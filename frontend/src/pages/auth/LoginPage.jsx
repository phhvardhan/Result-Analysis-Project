import React, { useEffect }  from 'react';
// import Navbar from '../../components/navbar/Navbar';
import Loginone from './LoginOne';
import { connect } from "react-redux";
// import Logintest from './LoginTest';
import { checkAuthenticated, load_user } from "../../actions/auth";

const Loginpage = (props) => {
    useEffect(() => {
        props.checkAuthenticated();
        props.load_user();
    }, []);

    return (
        <div>
            {/* <Navbar /> */}
            {/* <Logintest /> */}
            
            
            <Loginone />
            {props.children}
        </div>
    );
}

export default connect(null, {checkAuthenticated, load_user })(Loginpage);


