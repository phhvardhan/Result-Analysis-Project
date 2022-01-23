import React, { Component, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// import { menu } from "./menu";
import { hasChildren } from "./utils";

import { hasChildren2 } from "./utils2";
import { hasChildren3 } from "./utils3";

class Sidebar extends Component {

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
      <div>
        {this.state.batch.map((value,index) => {
            return <MenuItem item={value} key={index}/>;
        })}
      </div>
    )
  }


  // return props.data.map((item, key) => <MenuItem key={key} item={item} />);
}

export default Sidebar;

const MenuItem = ({ item }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} />;
};


const MenuItem2 = ({ item }) => {
  const Component = hasChildren2(item) ? MultiLevel2 : SingleLevel;
  return <Component item={item} />;
};

const MenuItem3 = ({ item }) => {
  const Component = hasChildren3(item) ? MultiLevel3 : SingleLevel;
  return <Component item={item} />;
};

const SingleLevel = ({ item }) => {
  const get= (id) =>{
    console.log(id)
  }
  return (
    <ListItem button onClick={get(item.id)}>
      <ListItemText primary={item.name} />
    </ListItem>
  );
};

const MultiLevel = ({ item }) => {
  // const { items: children } = item;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={item.name} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.reg.map((child, key) => (
            <MenuItem2 key={key} item={child} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

const MultiLevel2 = ({ item }) => {
  // const { items: children } = item;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={item.title} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.data.map((child, key) => (
            <MenuItem3 key={key} item={child} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

const MultiLevel3 = ({ item }) => {
  // const { items: children } = item;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={item.name} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.sem.map((child, key) => (
            <MenuItem3 key={key} item={child} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};




