import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import { verify } from '../../actions/auth';
import "./loginTEST.css"

const Activate = ({verify, match}) => {
    const [verified, setVerified] = useState(false);
    const verify_account = e => {
        const uid = match.params.uid;
        const token = match.params.token;
        verify(uid,token);
        setVerified(true);
    }

    if (verified){
        return <Redirect to="/" />
    }
    return (
        <div>
            <section className="pt-5 pb-5 mt-0 align-items-center d-flex bg-dark ll" >
                <div className="container-fluid">
                <div className="row  justify-content-center align-items-center d-flex-row text-center h-100">
                    <div className="col-12 col-md-4 col-lg-3   h-50 ">
                    <div className="card shadow">
                        <div className="card-body mx-auto">
                        <h4 className="card-title mt-3 text-center">Verify Your Account: </h4>
                        <br /><br />
                        <button
                            onClick={verify_account}
                            style={{marginTop: '50px'}}
                            type='button'
                            className='btn btn-primary'
                        >Verify</button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        </div>
    );
}





export default connect(null, {verify})(Activate);
