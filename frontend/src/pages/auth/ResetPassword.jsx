import React, {useState} from 'react';
import {  Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import { reset_password } from '../../actions/auth';
import "./loginTEST.css"

const ResetPassword = ({reset_password}) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email:'',
    });

    const {email, password} = formData;
    
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});


    const onSubmit = e => {
        e.preventDefault();
        reset_password(email);
        setRequestSent(true);
    }

    if (requestSent){
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
                        <h4 className="card-title mt-3 text-center">Request Password Reset:</h4>
                        <br /><br />
                        <form onSubmit={e => onSubmit(e)}>
                            <div className="form-group input-group mb-4">
                                <label htmlFor=""></label>
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                            </div>
                            <input type="email" 
                                className='form-control' placeholder='Email' name='email'
                                value={email}
                                
                                onChange={e => onChange(e)}
                                required
                                />
                            </div>
                            <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block px-5 mt-3 mb-2">Login</button>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        </div>
    );
}



const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});



export default connect(mapStateToProps, {reset_password})(ResetPassword);
