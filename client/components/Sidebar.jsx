import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Menu,
  CssBaseline,
  Box
} from "@mui/material";
import {
  CheckBoxOutlineBlankOutlined,
  DraftsOutlined,
  HomeOutlined,
  InboxOutlined,
  MailOutline,
  ReceiptOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(false)}>
      <ListItem button>
        <ListItemText primary='Tangerine'/>
        <ListItemIcon><MenuIcon/></ListItemIcon>
      </ListItem>
    </div>
  );
  return (
    <div>
    <React.Fragment>
    <CssBaseline />
    <Box display="flex" flexDirection="row" >
        <Box flexGrow={0}></Box>
      <AppBar elevation={0} position="sticky">
    <Toolbar className='sidebar'>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
      <MenuIcon onClick={() => setOpen(true)}></MenuIcon>

      <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
        {getList()}
      </Drawer>
      </IconButton>
    </Toolbar>
  </AppBar>
  </Box>
  </React.Fragment>
    </div>
  );
}

export default Sidebar;