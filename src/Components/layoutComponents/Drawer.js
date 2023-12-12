import React from 'react'
import MuiDrawer from '@mui/material/Drawer';
import { styled, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import IMAGES from '../../images/Images';
import {
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `0px`,
  [theme.breakpoints.up('sm')]: {
    width: `0px`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerComp = () => {
  const navigate = useNavigate()
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down('600'))
  const [open, setOpen] = useState(true)
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
    <div style={{display: mobileScreen? 'none':"flex"}}>
      <Drawer
      variant='permanent'
      open={open}
      >
        <DrawerHeader sx={{display:'flex',justifyContent: 'center',position: 'sticky',top:'0',backgroundColor: 'white',zIndex:'1'}}>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
          <img src={IMAGES.company_logo} style={{width: '200px'}}/>
        </DrawerHeader>
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <img src={IMAGES.dashboard} style={{width:"25px"}}/>
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <img src={IMAGES.accSetting} style={{width:"25px"}}/>
              </ListItemIcon>
              <ListItemText onClick={()=>{navigate('accSetting')}}>Account Settings</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider>
          {/* <span className='text-secondary' style={{fontSize: '15px',display:'flex',alignItems: 'center'}}>Pages</span> */}
        </Divider>
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <img src={IMAGES.userList} style={{width:"25px"}}/>
              </ListItemIcon>
              <ListItemText onClick={()=>{navigate('userList')}}>User list</ListItemText>
            </ListItemButton>
            <ListItemButton
            onClick={()=>{navigate('boatList')}}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <img src={IMAGES.boatList} style={{width:"25px"}}/>
              </ListItemIcon>
              <ListItemText>Boat list</ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
               <img src={IMAGES.bookingList} style={{width:"25px"}}/>
              </ListItemIcon>
              <ListItemText>Booking list</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider>
        {/* <span className='text-secondary' style={{fontSize: '15px',display:'flex',alignItems: 'center'}}>Next Pages</span> */}
        </Divider>
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={()=>{navigate('boatUserList')}}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <img src={IMAGES.bookingList} style={{width:"25px"}}/>
              </ListItemIcon>
              <ListItemText>Boat user list</ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <img src={IMAGES.bookingList} style={{width:"25px"}}/>
              </ListItemIcon>
              <ListItemText>Boat type</ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <img src={IMAGES.bookingList} style={{width:"25px"}}/>
              </ListItemIcon>
              <ListItemText>Boat services</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
    </>
  )
}

export default DrawerComp