import React, {useEffect} from 'react';
import Topbar from "../../components/topbar/Topbar";
// import "./upload.css";
import { connect } from "react-redux";
import { GetBackData } from '../../actions/auth';
import BackSem from './semdata/BackSem';
const BackUpSem = (props) => {

    useEffect(() => {
        props.GetBackData();
    }, []);
    
   
    return (
        <div>
            <Topbar />
            <div className="">
            <BackSem data={props.backdata}/>
            {props.children}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    backdata: state.auth.backdata
});

export default connect(mapStateToProps, { GetBackData })(BackUpSem);

