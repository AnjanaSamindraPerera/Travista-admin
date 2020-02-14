import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import CoverSkeleton from '../util/skeltons/CoverSkelton';
//MUI stuff
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'; //five info when hover over

//icons
// import LocationOn from '@material-ui/icons/LocationOn';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
// import EditIcon from '@material-ui/icons/Edit';

//redux
import { connect } from 'react-redux';
import { logoutUser, uploadCoverImage } from '../redux/actions/userAction';

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
      width: 800,
      height: 300,
      objectFit: 'cover',
      maxWidth: '100%'
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

class Cover extends Component {
  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  handleImageChange = event => {
    // console.log('in cover1');
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);

    this.props.uploadCoverImage(formData);
  };

  render() {
    const {
      classes,
      user: {
        credentials: { imageUrlCover, category },
        loading,
        authenticated
      }
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img
                src={imageUrlCover}
                alt="profile"
                className="profile-image"
              />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
            </div>
            <Tooltip title="Edit Cover picture" placement="top">
              <IconButton onClick={this.handleEditPicture} className="button">
                <AddAPhotoIcon color="primary" />
              </IconButton>
            </Tooltip>
            <div className="profile-details">
              {category && (
                <Fragment>
                  <VerifiedUserIcon color="primary" />

                  <span>{category}</span>
                </Fragment>
              )}
            </div>
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
      <CoverSkeleton />
    );

    return profileMarkup;
  }
}

Cover.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadCoverImage: PropTypes.func.isRequired
};

const mapActionsToProps = { logoutUser, uploadCoverImage };

const mapStateToProps = state => ({
  user: state.user
});
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Cover));
