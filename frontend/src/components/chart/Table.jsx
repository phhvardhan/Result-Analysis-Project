import React,{useState, useEffect} from 'react';
import { connect } from 'react-redux';

const Table = ({subjVisData}) => {
    const [sect, setSect] = useState([]);
    
    const [data, setSubj] = useState([]);
    
    
    useEffect(() => {
        getsubjs()
    }, [subjVisData]);
    const getsubjs = () =>{
        if (subjVisData){
            if(subjVisData.sect){
                setSect(subjVisData.sect);
            }
            if(subjVisData.data){
                setSubj(subjVisData.data);
            }
        }
    }

    

    return (
        <div className="featured">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                    <th scope="col">Subjects</th>
                    {sect.map((value,index) =>{
                        return (
                            <th scope='col'>Section - {value}</th>
                        )
                    })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((value,index) => {
                        return (
                            <tr key={index}>
                                <th scope='3'>
                                    {value.subj}
                                </th>
                                {value.data.map((value2,index2) => {
                                    return (
                                        <td key={index2} className="">
                                            <span className='text-danger'> Failed : {value2.analysis.fail} </span> <br />
                                            <span className='text-primary'> Passed count : {value2.analysis.passed_student} </span><br />
                                            <span > Total Student : {value2.analysis.total_student}</span>
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = state => ({
    subjVisData: state.auth.subjVisData
});

export default connect(mapStateToProps )(Table);
