import React, { Component } from 'react';
import "./sidebar.css"; 
import {LineStyle, Timeline, TrendingUp,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
    PermIdentity} from "@material-ui/icons";


const Submenu = ({item}) => {
    return(
        <div>
            <h3 className="sidebarTitle">{item.title} and {item.year}</h3>
            <ul className="sidebarList">
                {item.data.map((value, index) => {
                    return(
                        <li key={index} className="sidebarListItem">
                            {value.name}
                        </li>
                    )
                })}
            </ul>
        </div>
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
