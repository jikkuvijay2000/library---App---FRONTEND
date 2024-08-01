import React, { useContext, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ListItemText, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import BlockIcon from '@mui/icons-material/Block';
import Logo from '../../src/assets/Logo.jpg';
import { UserContext } from '../contextAPI/Headers';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import UserListAdmin from '../Components/UserListAdmin';
import DashboardAdmin from '../Components/DashboardAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardUpload from '../Components/DashboardUpload';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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

function Admin() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Dashboard');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const { username, role, logout } = useContext(UserContext);
  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem('access_token');
    logout();
    navigate('/');
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'Dashboard':
        return <DashboardAdmin />;
      case 'Users List':
        return <UserListAdmin />;
      case 'Manage uploads':
        return <Typography style={{ marginTop: '-15px' }}><DashboardUpload/></Typography>;
      case 'Ban a user':
        return <Typography paragraph>Ban a user Content</Typography>;
      default:
        return <Typography paragraph>Select an item from the menu</Typography>;
    }
  };

  return (
   <div className='transparent-bg'>
     <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar className='bg-white'>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" className="d-flex align-items-center justify-content-space-between">
            <img
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top "
              alt="React Bootstrap logo"
            />
            <b className='text-primary' style={{ fontSize: "14px", }}>Book<span className='text-warning'>Holic</span></b>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {cookies.access_token && username && role && (
            <Typography variant="h6" noWrap component="div" className="d-flex align-items-center">
              <span className='me-2 text-dark' style={{ fontSize: "16px" }}>Mr. {username} ({role})</span>
              <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Drawer variant="permanent" open={open}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: theme.spacing(0, 1),
              ...theme.mixins.toolbar,
            }}
          >
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </Box>
          <Divider />
          <List>
            {[
              { text: 'Dashboard', icon: <DashboardIcon /> },
              { text: 'Users List', icon: <PeopleIcon /> },
              { text: 'Manage uploads', icon: <UploadFileIcon /> },
             
            ].map((item) => (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={() => handleMenuItemClick(item.text)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ ...theme.mixins.toolbar }} />
          {renderContent()}
        </Box>
      </Box>
    </Box>
   </div>
  );
}

export default Admin;
