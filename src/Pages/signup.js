import React, { Component } from 'react';
import Pic from '../images/Pic.png';
import { Link } from 'react-router-dom';
import SL2 from '../images/SL2.jpg';
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

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
//bring grid
import Grid from '@material-ui/core/Grid';

//redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userAction';

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
  formControl: {
    marginTop: 20,
    // marginBottom:100,
    minWidth: 120,
    maxWidth: 300
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
    backgroundImage: `url(${SL2})`,
    backgroundRepeat: 'no-repeat',

    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '900px',
    height: '800px'
  }
};

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '', //name

      category: '',
      errors: {}
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });

    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
      category: this.state.category
    };

    this.props.signupUser(newUserData, this.props.history);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) this.setState({ errors: nextProps.UI.errors }); //get errors and set them to local state
  }

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
      <Grid container spacing={10} className={classes.form}>
        <Grid item sm className={classes.image2}>
          <img src={Pic} alt="logo" className={classes.image} />
        </Grid>

        <Grid item sm component={Paper} elevation={6}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography
              variant="h5"
              component="h1"
              className={classes.pageTittle}
            >
              Sign up
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

              <TextField
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                className={classes.textField}
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
                fullWidth
              />

              <TextField
                id="handle"
                type="text"
                name="handle"
                label="Name"
                variant="outlined"
                className={classes.textField}
                value={this.state.handle}
                onChange={this.handleChange}
                helperText={errors.handle}
                error={errors.handle ? true : false}
                fullWidth
              />

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="category-simple">category</InputLabel>
                <Select
                  value={this.state.category}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'category',
                    id: 'category-simple'
                  }}
                >
                  <MenuItem value={1}>Admin</MenuItem>
                </Select>
              </FormControl>

              {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.general}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.button}
                disabled={loading}
              >
                Signup
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <br />

              <small>
                <Link
                  to="/login"
                  variant="body2"
                  className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-body2 MuiTypography-colorPrimary"
                >
                  {' '}
                  Already have an account ?
                </Link>
              </small>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
);
