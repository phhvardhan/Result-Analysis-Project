import React, { Component, useState } from 'react';
import "./sidebar.css"; 
import styled from 'styled-components';
import { Link } from '@material-ui/core';
import * as RiIcons from 'react-icons/ri';
import { fetchSemData, fetchSubjData } from '../../actions/visua';
import { connect } from 'react-redux';

const SidebarLinksem = styled(Link)`
display: flex;
color: white;
justify-content: space-between;
align-items: center;
padding: 20px;
list-style: none;
height: 60px;
text-decoration: none;
font-size: 18px;
margin-left:40px;
z-index:500;
text-decoration:none;
&:hover {
  background: #252831;
  border-left: 4px solid #632ce4;
  cursor: pointer;
  color:white;
}
`;

const SidebarLabelsem = styled.span`
margin-left: 46px;
z-index:111500;
`;




const SidebarLabeltt = styled.span`
margin-left: 66px;
`;


const DropdownLinktt = styled(Link)`
background: #e0d5d5;
height: 60px;
padding-left: 3rem;
display: flex;
margin-left:20px;
align-items: center;
text-decoration: none;
color: black;
font-size: 18px;
z-index:10000;
&:hover {
  background: white;
  cursor: pointer;
  color:black;
}
`;

const SubSemSubmenu = ({item, fetchSemData,fetchSubjData}) => {

  const [subnava1, setSubnava1] = useState(false);

  const showSubnava1 = () => setSubnava1(!subnava1);
  
    const get = (id) =>{
      fetchSemData(id);
      fetchSubjData(id);
    }
  
  
    return (
        <>
        <SidebarLinksem onClick={item.name && showSubnava1}>
            <div>
            <SidebarLabelsem>{item.name} Semester</SidebarLabelsem>
            </div>
            <div>
          {item.name && subnava1
              ? <RiIcons.RiArrowUpSFill />
              : item.name
              ? <RiIcons.RiArrowDownSFill />
              : null}
          </div>
        </SidebarLinksem>
        {subnava1 &&
          <p onClick={get(item.id)}></p>
          }
        
        </>
    );
  };
  



  export default connect(null, {fetchSemData,fetchSubjData})(SubSemSubmenu);
  