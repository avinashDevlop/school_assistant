import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { BiAlignLeft, BiAlignRight } from 'react-icons/bi';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import './navBarCSS.css';

const TopHeader = ({ onToggleSidebar }) => {
  const [dateTime, setDateTime] = useState(getCurrentDateTime());
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(getCurrentDateTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function getCurrentDateTime() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = now.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
    return { time: formattedTime, date: ` ${formattedDate}` };
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    handleClose();
    navigate('/');
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const handleToggleSidebar = () => {
    onToggleSidebar();
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="header">
        <div className="left">
          <div className="title">School Assistant</div>
          <div className="icon1" onClick={handleToggleSidebar}>
            {isSidebarOpen ? <BiAlignLeft /> : <BiAlignRight />}
          </div>
        </div>

        <div className="center">
          St. JOHN'S ENGLISH MEDIUM SCHOOL, Mydukur
        </div>

        <div className="right">
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="large"
                sx={{ ml: 2 }} 
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                style={{color:'white',paddingRight:'20px'}}
              > 
                <FaUserCircle />
              </IconButton>
            </Tooltip>
          </Box>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>

          <div className="dateTime">
            <div className="live">
              <span>
                <GoDotFill className="liveDot" />
              </span>
              <span className="time">{dateTime.time}</span>
            </div>
            <span className="date">{dateTime.date}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopHeader;