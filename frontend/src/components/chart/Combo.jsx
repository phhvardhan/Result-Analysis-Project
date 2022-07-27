import React, {Component} from 'react';
import PieChart from "./PieChart";
import Bargraph from "./Bargraph"
import "./featuredinfo.css"
import Table from './Table';
const Combo = (props) => {
    
    return (
        <div className="">
            <div className='featured'>
                <div className="featuredItem ">
                    <h2>Grade Analysis</h2>
                    <br />
                    <PieChart cgpa_data={props.cgpa_data} />
                    
                </div>
                <div className="featuredItem ">
                    <h1>BackLog Details and Count</h1>
                    <br />
                    <br /><br /><br /><br /><br />
                    <Bargraph back_data={props.back_data} />
                    {/* <Bargraph  /> */}
                </div>
            </div>
            {/* <div className='featured'>
                <div className="featuredItem ">
                    <h2>Grade Analysis</h2>
                    <br />
                    <PieChart cgpa_data={props.cgpa_data} />
                </div>
                <div className="featuredItem ">
                    <h2>Grade Analysis</h2>
                    <br />
                    <PieChart cgpa_data={props.cgpa_data} />
                </div>
                <div className="featuredItem ">
                    <h2>Grade Analysis</h2>
                    <br />
                    <PieChart cgpa_data={props.cgpa_data} />
                </div>
            </div>
            <div className='featured'>
                <div className="featuredItem ">
                    <h2>Grade Analysis</h2>
                    <br />
                    <PieChart cgpa_data={props.cgpa_data} />
                </div>
                <div className="featuredItem ">
                    <h2>Grade Analysis</h2>
                    <br />
                    <PieChart cgpa_data={props.cgpa_data} />
                </div>
                <div className="featuredItem ">
                    <h2>Grade Analysis</h2>
                    <br />
                    <PieChart cgpa_data={props.cgpa_data} />
                </div>
            </div> */}
            <div className="featured">
                <div className="featuredItem">
                    <h1 className='d-flex justify-content-center'>Section Wise Subject Analysis</h1>
                    <hr />
                        <br />
                    <Table />
                </div>
            </div>
        </div>
    )
}


export default Combo;
