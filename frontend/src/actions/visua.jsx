import {
    FETCH_VIS_DATA_SUCCESS,
    FETCH_VIS_DATA_FAIL,
    FETCH_SUBJ_DATA_SUCCESS,
    FETCH_SUBJ_DATA_FAIL,
} from "./types";
import axios from "axios";

export const fetchSemData = (id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/subj/${id}`,config)
        dispatch({
            type: FETCH_VIS_DATA_SUCCESS,
            payload: res.data,
        })
        
    }catch(err){
        dispatch({
            type: FETCH_VIS_DATA_FAIL,
        })
    }

}

export const fetchSubjData = (id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/student/${id}`,config)
        dispatch({
            type: FETCH_SUBJ_DATA_SUCCESS,
            payload: res.data,
        })
        
    }catch(err){
        dispatch({
            type: FETCH_SUBJ_DATA_FAIL,
        })
    }

}
