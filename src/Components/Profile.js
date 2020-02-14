import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import ProfileSkeleton from '../util/skeltons/ProfileSkelton';
//MUI stuff
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'; //five info when hover over

//icons
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CalendarToday from '@material-ui/icons/CalendarToday';
// import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
//redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userAction';

const styles = theme => ({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: theme.palette.primary.main
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
}); //wrap around () to return from function straight away

class Profile extends Component {
  handleEditPicture = () => {
    const fileInput = document.getElementById('imagePro'); //unique id if not conflicts happens
    fileInput.click();
  };

  handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('imagePro', image, image.name);

    this.props.uploadImage(formData);
  };

  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl },
        loading,
        authenticated
      }
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image" />
              <input
                type="file"
                id="imagePro"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <Tooltip title="Edit profile picture" placement="top">
                <IconButton onClick={this.handleEditPicture} className="button">
                  <AddAPhotoIcon color="primary" />
                </IconButton>
              </Tooltip>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink component={Link} to={`/ `} color="primary" variant="h5">
                {handle}
              </MuiLink>
              <hr />
              <CalendarToday color="primary" />{' '}
              <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
            </div>

            <Tooltip title="Logout" placement="top">
              <IconButton onClick={this.handleLogout}>
                <KeyboardReturn color="error" />
              </IconButton>
            </Tooltip>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography component={'div'} variant="body2" align="center">
            No profile found please login again
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/signup"
              >
                Signup
              </Button>
            </div>
          </Typography>
        </Paper>
      )
    ) : (
      <ProfileSkeleton />
    );

    return profileMarkup;
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};

const mapActionsToProps = { logoutUser, uploadImage };

const mapStateToProps = state => ({
  user: state.user
});
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
