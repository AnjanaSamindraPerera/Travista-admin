import React, { Component } from 'react';
import Pic from '../images/Pic.png';
import SL from '../images/SL.jpg';
import { Link } from 'react-router-dom';
import Copyright from '../util/Copyright';
//material ui
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

//bring grid
import Grid from '@material-ui/core/Grid';

//redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userAction';

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
  progress: {
    position: 'absolute'
  },

  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    backgroundColor: '#ff3d00',
    position: 'center'
  },

  image2: {
    backgroundImage: `url(${SL})`,
    backgroundRepeat: 'no-repeat',

    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '900px',
    height: '800px'
  }
};

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) this.setState({ errors: nextProps.UI.errors }); //get errors and set them to local state
  }

  handleSubmit = event => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData, this.props.history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;

    return (
      <div>
        <Grid container spacing={10} className={classes.form} component={Paper}>
          <Grid item sm className={classes.image2}>
            <img src={Pic} alt="logo" className={classes.image} />
          </Grid>

          <Grid item sm component={Paper} elevation={6}>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
            </div>
            <Typography
              variant="h5"
              component="h1"
              className={classes.pageTittle}
            >
              Sign in
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
              <TextField
                id="password"
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                className={classes.textField}
                value={this.state.password}
                onChange={this.handleChange}
                helperText={errors.password}
                error={errors.password ? true : false}
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
                Login
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <br />
              <br />
              <Link
                to="/signup"
                variant="body2"
                className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-body2 MuiTypography-colorPrimary"
              >
                {' '}
                Don't have an account ? Sign Up
              </Link>
              <br />{' '}
              <Link
                to="/forgotPassword"
                variant="body2"
                className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-body2 MuiTypography-colorPrimary"
              >
                {' '}
                Forgot password?
              </Link>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

login.propTypes = {
  //propTypes used for Typechecking purposes ..will be easy in near future not now though
  // You can chain any of the above with `isRequired` to make sure a warning
  // is shown if the prop isn't provided.

  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
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
  loginUser //function
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(login));
