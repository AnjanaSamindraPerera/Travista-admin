import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//redux
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userAction';

//MUI stuff
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'; //five info when hover over

//icons
import EditIcon from '@material-ui/icons/Edit';

//form dialogs
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
  form: {
    textAlign: 'center'
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
    telNO: '',
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
      <Fragment>
        <Tooltip title="Edit details" placement="top">
          <IconButton onClick={this.handleOpen} className={classes.Button}>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            <span style={{ fontFamily: 'Arial', color: '#00bcd4' }}>
              Edit your details
            </span>
          </DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                inputProps={{ style: { fontFamily: 'Arial', color: 'green' } }}
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
                inputProps={{ style: { fontFamily: 'Arial', color: 'green' } }}
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
                inputProps={{ style: { fontFamily: 'Arial', color: 'green' } }}
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
                inputProps={{ style: { fontFamily: 'Arial', color: 'green' } }}
                placeholder=" Your contact number"
                className={classes.textField}
                variant="outlined"
                value={this.state.telNo}
                onChange={this.handleChange}
                fullWidth
              />

              <TextField
                name="booking"
                type="text"
                label="Booking"
                variant="outlined"
                inputProps={{ style: { fontFamily: 'Arial', color: 'green' } }}
                placeholder="Your Booking site information"
                className={classes.textField}
                value={this.state.booking}
                onChange={this.handleChange}
                fullWidth
              />
            </form>

            {/* <h2>Geo location</h2> */}
            <Button
              color="primary"
              variant="contained"
              onClick={this.getLocation}
            >
              Get cordinates
            </Button>
            <h4>coordinates</h4>
            <p>Latitude:{this.state.latitude}</p>
            <p>Longitude:{this.state.longitude}</p>
            {/* <p>Address:{this.state.userAddress}</p> */}

            {this.state.latitude && this.state.longitude ? (
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=14&size=400x300&sensor=false&key='AIzaSyBu_WFDMOH6wmKg9ju9yjdmkDfKsVzXsiQ'`}
                alt=""
              />
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              cancel
            </Button>

            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
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
