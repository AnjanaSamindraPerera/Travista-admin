import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';

// import Drawer from '@material-ui/core/Drawer';

//mui-icons
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MailIcon from '@material-ui/icons/Mail';

import { withStyles } from '@material-ui/styles';
import { MenuList, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userAction';

const drawerWidth = 240;

const styles = {
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  //   toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    color: '#00bcd4'
    // backgroundColor: theme.palette.background.default,
    // padding: theme.spacing(3)
  }
};

class Sidebar extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const classes = this.props;
    return (
      <div>
        <div className={classes.toolbar} />
        <Divider />

        <MenuList>
          <MenuItem component={Link} to="/settingsEmail">
            <MailIcon /> Change Email
          </MenuItem>
          <MenuItem component={Link} to="/settingsPassword">
            <VpnKeyIcon /> Change Password
          </MenuItem>
          <MenuItem component={Link} to="/settingsDelete">
            <DeleteForeverIcon /> Delete Account
          </MenuItem>
        </MenuList>

        <Divider />

        <MenuList>
          <MenuItem>
            <IconButton onClick={this.handleLogout}>
              <ExitToAppIcon />
              Logout
            </IconButton>
          </MenuItem>
        </MenuList>
      </div>
    );
  }
}

Sidebar.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapActionsToProps = { logoutUser };

const mapStateToProps = state => ({
  user: state.user
});
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Sidebar));
