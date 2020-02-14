import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Paper from '@material-ui/core/Paper';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import PublicIcon from '@material-ui/icons/Public';

const styles = {
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
        color: '#00bcd4'
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
  },
  handle: {
    height: 20,
    backgroundColor: '#00bcd4',
    width: 60,
    margin: '0 auto 7px auto'
  },
  fullLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '50%',
    marginBottom: 10
  }
};

const AboutSkelton = props => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="profile-details">
          <PublicIcon color="action" />
          <b>Intro</b>
          <p color="primary" /> <span>Bio</span>
          <hr />
          <LocationOn color="primary" /> <span>Location</span>
          <hr />
          <LinkIcon color="primary" /> https://website.com
          <hr />
          <LocalPhoneIcon color="primary" /> Telephone number
          <hr />
          <LinkIcon color="primary" /> https://booking.com
        </div>
      </div>
    </Paper>
  );
};

AboutSkelton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AboutSkelton);
