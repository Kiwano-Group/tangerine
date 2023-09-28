import { Drawer, ListItem, ListItemIcon, ListItemText, Typography, AppBar, Toolbar, IconButton } from "@mui/material";

import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { GiOrange } from "react-icons/gi";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown.jsx";
import icon from "../assets/icon.jpg";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const getList = () => (
    <div style={{ width: 250, }} onClick={() => setOpen(false)}>
      <br></br>
      <ListItem>
        <ListItemIcon  sx={{minWidth: 40}}><GiOrange className='tangerine'/></ListItemIcon>
        <ListItemText className = 'tangerine' primaryTypographyProps={{fontSize: '36px'}} primary='Tangerine'></ListItemText>
      </ListItem>
      <br></br>
      <hr style={{margin: 20}}></hr>
      <ListItem className="material-list">
          <Link to="/onboard" className="sidebar-btn" style={{flex: 1}}>
              Create Onboard
          </Link>
      </ListItem>
      <ListItem className='material-list'>
        <Link to="/dashboard">
          <ListItemText className="list-item-text">Workflows</ListItemText>
        </Link>
      </ListItem>
      <ListItem className='material-list'>
        <Link to="/settings">
          <ListItemText className="list-item-text">Settings</ListItemText>
        </Link>
      </ListItem>
      <ListItem className='material-list'>
        <Link to="/">
          <ListItemText className="list-item-text">Logout</ListItemText>
        </Link>
      </ListItem>
          <Link to="/profile" className='bottom-push'>
            <img src={icon} width='60'></img>
          </Link>
    </div>
  );
  return (
    <div>
      <AppBar elevation={0} position="sticky">
        <Toolbar className='sidebar'>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <MenuIcon style={{ color: '#ffad42', fontSize: 40 }} onClick={() => setOpen(true)}></MenuIcon>

          <Drawer PaperProps={{sx: {backgroundColor: '#ffffff'}}} open={open} anchor={"left"} onClose={() => setOpen(false)}>
            {getList()}
          </Drawer>
          </IconButton>
          <Link to="/dashboard" className = 'logo'>
            <div> 
            <Typography variant="h4" component="div" sx={{ display:'flex', justifyContent: 'center', width: '100%' }}>
              <GiOrange/>Tangerine
            </Typography>
            </div>
          </Link>

        <Dropdown/>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Sidebar;