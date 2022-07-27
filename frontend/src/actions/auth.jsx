import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    GET_UP_DATA_SUCCESS,
    GET_UP_DATA_FAIL,
    GET_BACK_DATA_FAIL,
    GET_BACK_DATA_SUCCESS,
    STUDENT_UP_DATA_SUCCESS,
    STUDENT_UP_DATA_FAIL,
} from "./types";
// import React, {useState} from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        const body = JSON.stringify({token: localStorage.getItem('access')});

        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body,config);
            // console.log(res)
            if (res.data.code !== 'token_not_valid'){
                dispatch({
                    type: AUTHENTICATED_SUCCESS,
                })
            }else{
                dispatch({
                    type: AUTHENTICATED_FAIL,
                })
            }

        }catch(err){
            dispatch({
                type: AUTHENTICATED_FAIL,
            })
        }

    }else{
        dispatch({
            type: AUTHENTICATED_FAIL,
        })
    }
};


export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }; 

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
    
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);
        // console.log(res);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
};



export const signup = (name,first_name, last_name,email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name,first_name, last_name,email, password, re_password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);
        // console.log(res);
        dispatch({
            type:     SIGNUP_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
    }
};


export const verify = (uid,token) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({uid,token});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);
        // console.log(res);
        dispatch({
            type: ACTIVATION_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
};

export const reset_password = (email) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email});

    try{
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,body,config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        })

    }catch(err){
        dispatch({
            type: PASSWORD_RESET_FAIL
        })
    }
}


export const reset_password_confirm = (uid,token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({uid, token, new_password, re_new_password});

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,body,config)
        
        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        })
    
    }catch(err){
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        })
    }

}



export const logout = () => dispatch => {
    dispatch({
        type:  LOGOUT,
    });
}

// REACTJS GET SEM ANALYSIS API HANDLER

export const GetUploadData = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/updata`,config)
        dispatch({
            type: GET_UP_DATA_SUCCESS,
            payload: res.data,
        })
        
    }catch(err){
        dispatch({
            type: GET_UP_DATA_FAIL,
        })
    }

}

export const GetBackData = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/backupdata`,config)
        dispatch({
            type: GET_BACK_DATA_SUCCESS,
            payload: res.data,
        })
        
    }catch(err){
        dispatch({
            type: GET_BACK_DATA_FAIL,
        })
    }

}






export const semupload = (data) => async dispatch => {
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/data`, data);
        
        <Redirect to="/" />
    } catch (err) {
        
    }
};


export const backupload = (data) => async dispatch => {
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/backpost`, data);
        

    } catch (err) {
        
    }
};



export const studentup = (data) => async dispatch => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/student`, data);  

    } catch (err) {
        
    }
};


