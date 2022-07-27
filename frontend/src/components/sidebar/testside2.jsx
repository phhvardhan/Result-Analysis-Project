import React, { Component, useState } from 'react';
import "./sidebar.css"; 
import styled from 'styled-components';
import { Link } from '@material-ui/core';
import * as RiIcons from 'react-icons/ri';
import { fetchSemData } from '../../actions/visua';
import { Redirect } from 'react-router-dom';
import SubSemSubmenu from "./SubSemSubmenu";

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;


const SidebarLinkreg = styled(Link)`
  display: flex;
  background: #255551;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  margin-left:20px;
  &:hover {
    background: #255f3f;
    border-left: 4px solid #63ffe4;
    cursor: pointer;
    color:white;
  }
`;

const SidebarLabelreg = styled.span`
  margin-left: 26px;
`;


const SidebarLinksem = styled(Link)`
  display: flex;
  color: white;
  background: #295949;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  margin-left:40px;
  &:hover {
    background: #296959;
    border-left: 4px solid #632ce4;
    cursor: pointer;
    color:white;
  }
`;

const SidebarLabelsem = styled.span`
  margin-left: 46px;
`;

const SidebarLabeltt = styled.span`
  margin-left: 66px;
`;

const DropdownLink = styled(Link)`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  &:hover {
    background: #632ce4;
    cursor: pointer;
  } 
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
  &:hover {
    background: white;
    cursor: pointer;
    color:black;
  }
`;








const SemSubmenu = ({item}) => {
  const [Semid, setSemid] = useState();


  const [subnava1, setSubnava1] = useState(false);

  const showSubnava1 = () => setSubnava1(!subnava1);

  const get = (id) =>{
    console.log(id);
  }



  return (
      <>
      <SidebarLinksem to={item.path} onClick={item.sem && showSubnava1}>
          <div>
          <SidebarLabelsem>{item.name}</SidebarLabelsem>
          </div>
          <div>
          {item.sem && subnava1
              ? <RiIcons.RiArrowUpSFill />
              : item.name
              ? <RiIcons.RiArrowDownSFill />
              : null}
          </div>
      </SidebarLinksem>
      {subnava1 &&
          item.sem.map((item, index) => {
          return (
              <SubSemSubmenu item={item} key={index}/>
          );
          })}
      </>
  );
}


const SubSubmenu = ({item}) => {
  const [subnava1, setSubnava1] = useState(false);

  const showSubnava1 = () => setSubnava1(!subnava1);

  return (
      <>
      <SidebarLinkreg to={item.path} onClick={item.data && showSubnava1}>
          <div>
          <SidebarLabelreg>{item.title}</SidebarLabelreg>
          </div>
          <div>
          {item.data && subnava1
              ? <RiIcons.RiArrowUpSFill />
              : item.title
              ? <RiIcons.RiArrowDownSFill />
              : null}
          </div>
      </SidebarLinkreg>
      {subnava1 &&
          item.data.map((item, index) => {
          return (
              // <DropdownLink to={item.id} key={index}>
              // <SidebarLabel>{item.name}</SidebarLabel>
              // </DropdownLink>

              <SemSubmenu item={item} key={index}/>

          );
          })}
      </>
  );
}



const Submenu = ({item}) => {
    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => setSubnav(!subnav);

    return (
        <>
        <SidebarLink to={item.path} onClick={item.reg && showSubnav}>
            <div>
            <SidebarLabel>{item.name}</SidebarLabel>
            </div>
            <div>
            {item.reg && subnav
                ? <RiIcons.RiArrowUpSFill />
                : item.name
                ? <RiIcons.RiArrowDownSFill />
                : null}
            </div>
        </SidebarLink>
        {subnav &&
            item.reg.map((item, index) => {
            return (
                // <DropdownLink to={item.id} key={index}>
                // <SidebarLabel>{item.title}</SidebarLabel>
                // </DropdownLink>
                <SubSubmenu item={item} key={index}/>
                
                  // <div className="sidebarMenu">  
                  // <SidebarLabel>{item1.title}</SidebarLabel>
                  //   {item1.data.map((value2,index2) => {
                  //       return <SubSubmenu item={value2} key={index2}/>;
                  //   })}
                // </div>
            );
            })}
        </>
    );
}


class Sidebar extends Component{

    constructor(props) {
        super(props);
        this.state = {
          batch: []
        };
      }

    setdataintoDAta = data => {
        this.setState({batch: data});
        // console.log(this.state.batch)
    
      }
    


    componentDidMount(){
        fetch( `http://127.0.0.1:8000/test`,{
                method: "GET",
            }).then(resp => resp.json())
            // .then(resp => console.log(resp))
            .then(res => this.setdataintoDAta(res))
            .catch(error => console.log(error))
      };

    


    
    
    render(){
        return (
            <div className='sidebar'> 
                <div className="sidebarWrapper">
                    <div className="sidebarMenu">
                            
                                {this.state.batch.map((value,index) => {
                                    return <Submenu item={value} key={index}/>;
                                })}
                    </div>
                </div>
            </div>
        );
    }
    
    }
export default Sidebar;
