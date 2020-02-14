import React, { Component } from 'react';
import Sidebar from '../../Components/Sidebar';
//material ui
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

//bring grid
import Grid from '@material-ui/core/Grid';

//redux
import { connect } from 'react-redux';
import { changeEmail } from '../../redux/actions/userAction';

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
  }
};

class settingsEmail extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
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
      password: this.state.password,
      email: this.state.email
    };

    this.props.changeEmail(userData);
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
    const { messages } = this.state;

    return (
      <div>
        <Grid
          container
          spacing={10}
          className={classes.form}
          component={Paper}
          style={{ height: '100vh' }}
        >
          <Grid item sm>
            <Sidebar />
          </Grid>

          <Grid item sm>
            <Typography variant="h2" className={classes.pageTittle}>
              Change Email
            </Typography>
            <br />

            {/* <Typography className={classes.pageTittle}>
            <Box fontWeight="fontWeightBold" fontStyle="oblique" m={1}>
              We will send you an email with instructions on how to reset your
              password.
            </Box>
          </Typography> */}
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                id="password"
                type="password"
                name="password"
                label="Current Password"
                variant="outlined"
                className={classes.textField}
                value={this.state.password}
                onChange={this.handleChange}
                helperText={errors.password}
                error={errors.password ? true : false}
                fullWidth
              />

              <TextField
                id="email"
                type="text"
                name="email"
                label="email"
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
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={loading}
              >
                Change Email
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <br />
              <br />
              {messages.message && (
                <Typography variant="h2" className={classes.customSuccess}>
                  {messages.message}
                </Typography>
              )}
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

settingsEmail.propTypes = {
  //propTypes used for Typechecking purposes ..will be easy in near future not now though
  // You can chain any of the above with `isRequired` to make sure a warning
  // is shown if the prop isn't provided.

  classes: PropTypes.object.isRequired,
  changeEmail: PropTypes.func.isRequired,
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
  changeEmail //function
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(settingsEmail));
