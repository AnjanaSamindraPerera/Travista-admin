import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
//import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

//material-ui icons

//import MailIcon from '@material-ui/icons/Mail';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import { MenuItem } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import axios from 'axios';

const drawerWidth = 205;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('FBIdToken'); //delete local storage auth header
    delete axios.defaults.headers.common['Authorization']; //delete axios auth  header
    window.location.href = '/';
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <MenuItem component={Link} to="/home">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText secondary="Reported posts" />
          </MenuItem>

          <MenuItem component={Link} to="/signup">
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText secondary="Register an admin" />
          </MenuItem>
          <MenuItem component={Link} to="/edit">
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText secondary="Edit details" />
          </MenuItem>
          <a
            href="https://dashboard.stripe.com/test/payments"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MenuItem>
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>

              <ListItemText secondary="Manage Payments" />
            </MenuItem>
          </a>
          <Divider />
          <List>
            <MenuItem component={Link} to="/settingsDelete">
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText secondary="Delete Account" />
            </MenuItem>
            <MenuItem component={Link} to="/settingsEmail">
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText secondary="Change Email" />
            </MenuItem>
            <MenuItem component={Link} to="/settingsPassword">
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText secondary="Change Password" />
            </MenuItem>
          </List>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText secondary="Logout" />
          </MenuItem>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
