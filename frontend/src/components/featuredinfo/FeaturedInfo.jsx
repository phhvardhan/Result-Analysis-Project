 import React, { Fragment } from 'react';
 import "./featuredinfo.css"
import { connect } from "react-redux";
 const FeaturedInfo = (props) => {

    const failCount = () => {
        if (props.semVisData){
            if(props.semVisData.Fail_count){
                return <Fragment>
                    {props.semVisData.Fail_count}
                </Fragment>
            }
            else{
                if (props.semVisData.Fail_count === 0){
                    return 0
                }
                return <Fragment>
                    No data Found
                </Fragment>
            }
        }else{
            return <Fragment>
                No data Found
            </Fragment>
        }
    }
    const passCount = () => {
        if (props.semVisData){
            if(props.semVisData.Pass_count){
                return <Fragment>
                    {props.semVisData.Pass_count}
                </Fragment>
            }
            else{
                return <Fragment>
                    No data Found
                </Fragment>
            }
        }else{
            return <Fragment>
                No data Found
            </Fragment>
        }
    }

    const regesterCount = () => {
        if (props.semVisData){
            if(props.semVisData.Total_Registered){
                return <Fragment>
                    {props.semVisData.Total_Registered}
                </Fragment>
            }
            else{
                return <Fragment>
                    No data Found
                </Fragment>
            }
        }else{
            return <Fragment>
                No data Found
            </Fragment>
        }
    }

     return (
        <div className='featured'>
        <div className="featuredItem total">
            <span className="featuredTitle">Total Applications</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">{regesterCount()}</span>
                {/* <span className="featuredMoneyRate"> -11.4   */}
                {/* <ArrowDownward className='featuredIcon'/> */}
                {/* </span> */}
            </div>
            <span className="featuredSb">
               Students Registered
            </span>
        </div>
        <div className="featuredItem pass">
            <span className="featuredTitle">No of Students Passed</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">{passCount()}</span>
                {/* <span className="featuredMoneyRate"> -1.4  
                <ArrowDownward className='featuredIcon negative'/>
                </span> */}
            </div>
            <span className="featuredSb">
                Students passed
            </span>
        </div>
        <div className="featuredItem fail">
            <span className="featuredTitle">No of Students Failed</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">{failCount()}</span>
                {/* <span className="featuredMoneyRate"> +2.4  
                <ArrowUpward className='featuredIcon'/></span> */}
            </div>
            <span className="featuredSb">
                Students Failed
            </span>
        </div>
    </div>
     )
 }


const mapStateToProps = state => ({
    semVisData: state.auth.semVisData
});

export default connect(mapStateToProps)(FeaturedInfo);

