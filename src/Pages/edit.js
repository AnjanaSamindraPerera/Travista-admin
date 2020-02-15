import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import Profile from '../Components/Profile';

//redux
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userAction';

//MUI stuff
import Button from '@material-ui/core/Button';

//form dialogs
import TextField from '@material-ui/core/TextField';
//import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
//import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import Drawer from '../Components/Drawer';

const styles = {
  form: {
    textAlign: 'center',
    margin: '10px 20px 60px 20px'
  },
  pageTittle: {
    // color:'#43a047',
    margin: '20px auto 20px auto'
  },
  image: {
    margin: '20px auto 20px auto'
  },
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  },
  card: {
    margin: '1px auto 10px auto'
  }
};

class EditAbout extends Component {
  constructor(props) {
    super(props);
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
  }

  state = {
    bio: '',
    location: '',
    website: '',
    telNo: '',
    booking: '',
    open: false,
    latitude: '',
    longitude: '',
    userAddress: ''
  };

  getCoordinates(position) {
    console.log(position.coords.latitude);
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getCoordinates,
        this.handleLocationError
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        alert('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        alert('The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        alert('An unknown error occurred.');
        break;
      default:
    }
  }

  componentDidMount() {
    const { credentials } = this.props;
    this.setUserDetails(credentials);
  }

  setUserDetails = credentials => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      location: credentials.location ? credentials.location : '',
      website: credentials.website ? credentials.website : '',
      telNo: credentials.telNo ? credentials.telNo : '',
      booking: credentials.booking ? credentials.booking : ''
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.setUserDetails(this.props.credentials);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      location: this.state.location,
      website: this.state.website,
      telNo: this.state.telNo,
      booking: this.state.booking,
      lat: this.state.latitude.toString(),
      long: this.state.longitude.toString()
    };

    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item sm={1}>
            <Drawer />
          </Grid>

          <Grid item sm={7}>
            <Card className={classes.card}>
              <DialogTitle>
                <span style={{ fontFamily: 'Arial', color: '#00bcd4' }}>
                  Edit your details
                </span>
              </DialogTitle>
              <form className={classes.form}>
                <TextField
                  name="bio"
                  type="text"
                  label="Bio"
                  inputProps={{
                    style: { fontFamily: 'Arial', color: 'green' }
                  }}
                  multiline
                  rows="3"
                  placeholder="A short description about your service"
                  className={classes.textField}
                  variant="outlined"
                  value={this.state.bio}
                  onChange={this.handleChange}
                  fullWidth
                />

                <TextField
                  name="location"
                  type="text"
                  label="Location"
                  inputProps={{
                    style: { fontFamily: 'Arial', color: 'green' }
                  }}
                  placeholder="Your location"
                  className={classes.textField}
                  variant="outlined"
                  value={this.state.location}
                  onChange={this.handleChange}
                  fullWidth
                />

                <TextField
                  name="website"
                  type="text"
                  label="Website"
                  inputProps={{
                    style: { fontFamily: 'Arial', color: 'green' }
                  }}
                  placeholder="Your profesional website"
                  className={classes.textField}
                  variant="outlined"
                  value={this.state.website}
                  onChange={this.handleChange}
                  fullWidth
                />

                <TextField
                  name="telNo"
                  type="text"
                  label="Telephone NO"
                  inputProps={{
                    style: { fontFamily: 'Arial', color: 'green' }
                  }}
                  placeholder=" Your contact number"
                  className={classes.textField}
                  variant="outlined"
                  value={this.state.telNo}
                  onChange={this.handleChange}
                  fullWidth
                />

                <DialogActions>
                  <Button onClick={this.handleSubmit} color="primary">
                    Save
                  </Button>
                </DialogActions>
              </form>
            </Card>
          </Grid>
          <Grid item sm={3}>
            <Profile />
          </Grid>
        </Grid>
      </div>
    );
  }
}

EditAbout.propTypes = {
  classes: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditAbout)
);
