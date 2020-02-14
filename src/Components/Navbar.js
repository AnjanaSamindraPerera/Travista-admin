import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';

//redux
import { connect } from 'react-redux';

//meterial-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//icons
import HomeIcon from '@material-ui/icons/Home';
// import Notifications from '@material-ui/icons/Notifications';
import PostAd from './PostAd';
import PostAdImage from './PostAdImage';
import PostAdWithImg from './PostAdWithImg';
import Notifications from './Notifications';
import SettingsIcon from '@material-ui/icons/Settings';

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <PostAdWithImg />
              <PostAdImage />
              <PostAd />

              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>

              <Notifications />

              <Link to="/settingsEmail">
                <MyButton tip="Settings">
                  <SettingsIcon />
                </MyButton>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToprops = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToprops)(Navbar);
