import React from 'react';
import "./loginTEST.css"

const Logintest = () => {
    return (
        <div>
            <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto pp">
                <div class="card card0 border-0">
                    <h1 className="container d-flex justify-content-center mb-5 title">RESULT ANALYSIS</h1>
                    <div class="row d-flex">
                        <div class="col-lg-6">
                            <div class="card1 pb-5 mb-5">
                                {/* <div class="row"> <img src="https://i.imgur.com/CXQmsmF.png" class="logo" /> </div> */}
                                <div class="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src="https://i.imgur.com/uNGdWHi.png" class="image" /> </div>
                            </div>
                        </div>
                        <div class="col-lg-5 d-flex  justify-content-center  ">
                            <div class="card2 card border-0 px-5 py-5 d-flex justify-content-center">
                                <div class=""> <label class="mb-1">
                                        <h2 class="">Email Address</h2>
                                    </label> <input class="mb-4" type="text" name="email" placeholder="Enter a valid email address" /> </div>
                                <div class=""> <label class="mb-1">
                                        <h2 class="">Password</h2>
                                    </label> <input type="password" name="password" placeholder="Enter password" />
                                </div>
                                <div class="mb-3 px-3 d-flex justify-content-center mt-3"> <button type="submit" class="btn btn-blue text-center">Login</button> </div>
                                <div class="mb-3 px-3 d-flex justify-content-center"> <small class="font-weight-bold">Don't have an account? <a class="text-danger ">Register</a></small> </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-blue py-4">
                        <div class="row px-3"> <small class="ml-4 ml-sm-5 mb-2">GVPCE RESULT</small>
                            <div class="social-contact ml-4 ml-sm-auto"> <span class="fa fa-facebook mr-4 text-sm"></span> <span class="fa fa-google-plus mr-4 text-sm"></span> <span class="fa fa-linkedin mr-4 text-sm"></span> <span class="fa fa-twitter mr-4 mr-sm-5 text-sm"></span> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Logintest;
