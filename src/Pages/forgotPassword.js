import React, { Component } from 'react';
import Pic from '../images/Pic.png';
import { toast } from 'react-toastify';
import SL3 from '../images/SL3.jpg';
import { Link } from 'react-router-dom';
import Copyright from '../util/Copyright';

//material ui
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

import Paper from '@material-ui/core/Paper';

//bring grid
import Grid from '@material-ui/core/Grid';

//redux
import { connect } from 'react-redux';
import { recoverPassword } from '../redux/actions/userAction';

const styles = {
  //classes.these atributes

  form: {
    textAlign: 'center'
  },
  pageTittle: {
    // color:'#43a047',
    margin: '20px auto 20px auto'
  },
  image: {
    margin: '300px auto 20px auto',
    width: '100px',
    height: '100px'
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
  customSuccess: {
    color: 'green',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    backgroundColor: '#ff3d00'
  },

  image2: {
    backgroundImage: `url(${SL3})`,
    backgroundRepeat: 'no-repeat',

    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '900px',
    height: '800px'
  }
};

class forgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      errors: {},
      messages: {}
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) this.setState({ errors: nextProps.UI.errors }); //get errors and set them to local state
    if (nextProps.UI.messages)
      this.setState({ messages: nextProps.UI.messages }); //get messages and set them to local state
  }

  handleSubmit = event => {
    event.preventDefault();

    const userData = {
      email: this.state.email
    };

    this.props.recoverPassword(userData);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  notify = message => {
    toast(message, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      type: 'success'
    });
  };
  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;
    const { messages } = this.state;

    return (
      <Grid container spacing={10} className={classes.form} component={Paper}>
        <Grid item sm className={classes.image2}>
          <img src={Pic} alt="logo" className={classes.image} />
        </Grid>

        <Grid item sm component={Paper} elevation={6}>
          <br />
          <br />
          <br />

          <Typography
            variant="h3"
            component="h1"
            className={classes.pageTittle}
          >
            {' '}
            Forgot Password
          </Typography>
          <br />

          <Typography component={'div'} className={classes.pageTittle}>
            <Box fontWeight="fontWeightBold" fontStyle="oblique" m={1}>
              We will send you an email with instructions on how to reset your
              password.
            </Box>
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              helperText={errors.email}
              error={errors.email ? true : false}
              fullWidth
            />

            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Email Me
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <br />
            {messages.message && this.notify(messages.message)}
            <small>
              <Link
                to="/login"
                variant="body2"
                className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-body2 MuiTypography-colorPrimary"
              >
                {' '}
                Back to login
              </Link>
            </small>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </Grid>
      </Grid>
    );
  }
}

forgotPassword.propTypes = {
  //propTypes used for Typechecking purposes ..will be easy in near future not now though
  // You can chain any of the above with `isRequired` to make sure a warning
  // is shown if the prop isn't provided.

  classes: PropTypes.object.isRequired,
  recoverPassword: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

//from global state
const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI //objects
});

//which action we use
const mapActionToProps = {
  recoverPassword //function
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(forgotPassword));
