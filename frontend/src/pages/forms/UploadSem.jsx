import React, {useEffect} from 'react';
import Topbar from "../../components/topbar/Topbar";
// import "./upload.css";
import { connect } from "react-redux";
import { GetUploadData } from '../../actions/auth';
import Sem from './semdata/Sem';
const UploadSem = (props) => {

    useEffect(() => {
        props.GetUploadData();
    }, []);
    
   
    return (
        <div>
            <Topbar />
            <div className="">
            <Sem data={props.updata}/>
            {props.children}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    updata: state.auth.updata
});

export default connect(mapStateToProps, { GetUploadData })(UploadSem);

