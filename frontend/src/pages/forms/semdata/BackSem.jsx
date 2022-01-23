import {connect} from "react-redux";
import { GetBackData, backupload } from '../../../actions/auth';
import React , {useState, Fragment} from 'react';
import { Redirect } from "react-router-dom";

const BackSem = (props) => {

    const [imagefile,setimagefile] = useState();
    const [formData, setFormData] = useState({
        reg:'',
        branch:'',
        batch:'',
        sem:''
    });

    const {sem,reg,branch,batch} = formData
    
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        const data  = new FormData();
        data.append('sem',sem);
        data.append('reg', reg);
        data.append('branch',branch);
        data.append('batch',batch);
        data.append('file',imagefile);
        props.backupload(data);
        <Redirect to="/" />
    }
    
    const regdata = () =>{
        if (props.backdata){
            if (props.backdata.reg)
            {
            return <Fragment>
                {props.backdata.reg.map((value, index) => {
                    return  <option value={value.id} key={index}>{value.title}</option>;  
                })}
            </Fragment>
            }
        }
        else{
            return <Fragment>
                <option value="">none</option>
            </Fragment>
        }
    }

    const branchdata = () =>{
        if (props.backdata){
            if (props.backdata.branch)
            {
            return <Fragment>
                {props.backdata.branch.map((value, index) => {
                    return  <option value={value.id} key={index}>{value.name}</option>;  
                })}
            </Fragment>
            }
        }
        else{
            return <Fragment>
                <option value="">none</option>
            </Fragment>
        }
    }
    const batchdata = () =>{
        if (props.backdata){
            if (props.backdata.batch)
            {
            return <Fragment>
                {props.backdata.batch.map((value, index) => {
                    return  <option value={value.id} key={index}>{value.name} of batch {value.reg}</option>;  
                })}
            </Fragment>
            }
        }
        else{
            return <Fragment>
                <option value="">none</option>
            </Fragment>
        }
    }

    const semdata = () =>{
        if (props.backdata){
            if (props.backdata.sem)
            {
            return <Fragment>
                {props.backdata.sem.map((value, index) => {
                    return  <option value={value.id} key={index}>{value.name} - Batch: {value.batch} - Branch: {value.branch}</option>;  
                })}
            </Fragment>
            }
        }
        else{
            return <Fragment>
                <option value="">none</option>
            </Fragment>
        }
    }

    
    return (
        <div>
            <section className="pt-5 pb-5 mt-0 align-items-center d-flex bg-dark ll" >
                <div className="container-fluid">
                <div className="row  justify-content-center align-items-center d-flex-row text-center h-100">
                    <div className="col-12 col-md-4 col-lg-4   h-50 ">
                    <div className="card shadow">
                        <div className="card-body mx-auto">
                        <h4 className="card-title mt-3 text-center">Upload Semester Back-LOG/ Supply Data: </h4>
                        <br />
                        <form  className='text-start' onSubmit={e => onSubmit(e)}>
                            <div className="form-group mb-4">
                                <label htmlFor="reg">Select Regulation</label>
                                <select name="reg" id='reg' onChange={e => onChange(e)} className="form-control">
                                    <option value=""> ---    ----</option>
                                    {regdata()}
                                </select>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="branch">Select Branch</label>
                                <select name="branch" id='branch' onChange={e => onChange(e)} className="form-control">
                                    <option value=""> ----  ----</option>
                                    {branchdata()}
                                </select>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="batch">Select Batch</label>
                                <select name="batch" id='batch' onChange={e => onChange(e)} className="form-control">
                                        <option value="">----    ----</option>
                                        {batchdata()}
                                </select>
                            </div>
                            <div className="form-group  mb-4">
                                <label htmlFor="sem">Semester Name</label>
                                <select name="sem" id='sem' onChange={e => onChange(e)} className="form-control">
                                        <option value="">----    ----</option>
                                        {semdata()}
                                </select>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="file">Upload Pre-formatted Excel File</label>
                                <input type="file" name="file" id="file" onChange={(evt) => setimagefile(evt.target.files[0])}  className='form-control'/>
                            </div>
                            <div className="form-group d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary btn-block px-5 mt-3 mb-2">Upload</button>
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
    backdata: state.auth.backdata
});



export default connect(mapStateToProps, { GetBackData, backupload })(BackSem);

