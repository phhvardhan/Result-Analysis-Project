import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import { signup } from '../../actions/auth';
import "./loginTEST.css"

const Signup = ({signup, isAuthenticated}) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        name:'',
        first_name: '',
        last_name:'',
        email:'',
        password:'',
        re_password:'',

    });

    const {email, password, first_name, last_name, name, re_password} = formData;
    
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});


    const onSubmit = e => {
        e.preventDefault();
        if(password === re_password){
            signup( name,first_name, last_name,email, password, re_password);
            setAccountCreated(true);
        }
    }

    if (isAuthenticated){
        return <Redirect to="/" />
    }
    if (accountCreated){
        return <Redirect to="/login" />
    }

    return (
        <div>
            <section className="pt-5 pb-5 mt-0 align-items-center d-flex bg-dark ll" >
                <div className="container-fluid">
                <div className="row  justify-content-center align-items-center d-flex-row text-center h-100">
                    <div className="col-12 col-md-4 col-lg-3   h-50 ">
                    <div className="card shadow">
                        <div className="card-body mx-auto">
                        <h4 className="card-title mt-3 text-center">Sign Up </h4>
                        <br /><br />
                        <form onSubmit={e => onSubmit(e)}>
                            <div className="form-group input-group mb-4">
                                <input type="text" 
                                    className='form-control' placeholder='UserName' name='name'
                                    value={name}
                                    
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                            <div className="form-group input-group mb-4">
                                <input type="text" 
                                    className='form-control' placeholder='First Name' name='first_name'
                                    value={first_name}
                                    
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                            <div className="form-group input-group mb-4">
                                <input type="text" 
                                    className='form-control' placeholder='Last Name' name='last_name'
                                    value={last_name}
                                    
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                            <div className="form-group input-group mb-4">
                                <input type="email" 
                                    className='form-control' placeholder='Email' name='email'
                                    value={email}
                                    
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                            <div className="form-group input-group">
                                <input type="password" 
                                    className='form-control' placeholder='Password' name='password'
                                    value={password}
                                    minLength='6'
                                    
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                            <div className="form-group input-group">
                                <input type="password" 
                                    className='form-control' placeholder='Confirm Password' name='re_password'
                                    value={re_password}
                                    minLength='6'
                                    
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block px-5 mt-3 mb-2">Sign Up</button>
                            </div>
                            <p className="text-center">Already have an account?
                            <Link to="/login">Login</Link>
                            </p>
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



export default connect(mapStateToProps, {signup})(Signup);
