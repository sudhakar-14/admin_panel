import React from 'react'
import IMAGES from '../../images/Images'
import { List, Menu, Visibility } from '@mui/icons-material'
import { Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import {
    useMediaQuery,
} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';

const Header = () => {
    const theme = useTheme()
    const mobileScreen = useMediaQuery(theme.breakpoints.down('600'))
    const [open, setOpen] = useState(false)

    const handleDrawerClose = () =>{
        setOpen(false)
    }
    const handleDrawerOpen = () =>{
        setOpen(true)
    }
  return (
    <>
        <div className='p-3 w-100 d-flex justify-content-between align-items-center'>
            <div 
            className='cursor-pointer' 
            style={{visibility: mobileScreen? 'visible':'hidden'}}
            onClick={handleDrawerOpen}
            >
                <Menu/>
            </div>
            <div className='gap-3 d-flex align-items-center'>
                <img src={IMAGES.bell_icon} style={{width: '30px',height:'30px'}}/>
                <img src={IMAGES.profile_icon} style={{width: '45px'}}/>
            </div>
        </div>
        <Drawer
        anchor='left'
        open={open}
        onClose={handleDrawerClose}
        >
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
                        <InboxIcon/>
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
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText>Account Settings</ListItemText>
                    </ListItemButton>
                </ListItem>
                </List>
                <Divider>
                <span className='text-secondary' style={{fontSize: '15px',display:'flex',alignItems: 'center'}}>Pages</span>
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
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText>User list</ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                    <ListItemIcon
                        sx={{
                        minWidth: 0,
                        mr: open ? 2 : 'auto',
                        justifyContent: 'center',
                        }}
                    >
                        <InboxIcon/>
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
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText>Booking list</ListItemText>
                    </ListItemButton>
                </ListItem>
                </List>
                <Divider>
                <span className='text-secondary' style={{fontSize: '15px',display:'flex',alignItems: 'center'}}>Next Pages</span>
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
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText>City list</ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                    <ListItemIcon
                        sx={{
                        minWidth: 0,
                        mr: open ? 2 : 'auto',
                        justifyContent: 'center',
                        }}
                    >
                        <InboxIcon/>
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
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText>Boat services</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    </>
  )
}

export default Header