
import React from "react";
import { Button, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ButtonAppBarCollapse from "./ButtonNavbarCollapse";
import { NavLink } from "react-router-dom";

const styles = theme => ({
  root: {
    position: "absolute",
    right: 0
  },
  buttonBar: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    margin: "10px",
    paddingLeft: "16px",
    right: 0,
    position: "relative",
    width: "100%",
    background: "transparent"
  },
  link: {
    color: "#00478C",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    height: "100%"
  }
});


const NavBarCollapse = props => (
  <div className={props.classes.root}>
    <ButtonAppBarCollapse>
      <MenuItem><NavLink className={props.classes.link} to="/">Pokemon List</NavLink></MenuItem>
      <MenuItem><NavLink className={props.classes.link} to="/pokebag">My Pokebag</NavLink></MenuItem>
    </ButtonAppBarCollapse>
    <div className={props.classes.buttonBar} id="appbar-collapse">
      <Button><NavLink className={props.classes.link} to="/">Pokemon List</NavLink></Button>
      <Button><NavLink className={props.classes.link} to="/pokebag">My Pokebag</NavLink></Button>
    </div>
  </div>
);

export default withStyles(styles)(NavBarCollapse);
