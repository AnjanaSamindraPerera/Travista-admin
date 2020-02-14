import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//redux
import { connect } from 'react-redux';
import { postAdWithImage, clearErrors } from '../redux/actions/dataAction';

//MUI stuff
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//MUI stuff

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'; //five info when hover over

//icons

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CloseIcon from '@material-ui/icons/Close';
import WallpaperIcon from '@material-ui/icons/Wallpaper';

//form dialogs
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MyButton from '../util/MyButton';

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
  },
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  }
};

class PostAdWithImg extends Component {
  state = {
    open: false,
    body: '',
    errors: {},
    image: ''
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById('imageAdCap');
    console.log('fileinput', fileInput);
    fileInput.click();
  };

  handleImageChange = event => {
    // console.log('in cover1');
    this.setState.image = document.getElementById('imageAdCap').files[0];
    console.log('image');
    console.log(this.state.image);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) this.setState({ errors: nextProps.UI.errors }); //get errors and set them to local state
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '', open: false, errors: {} });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault(); //stops the default action of an element from happening.

    const image = document.getElementById('imageAdCap').files[0];
    // const image = this.state.image;
    const body = this.state.body;
    const formData = new FormData();

    formData.append('image', image, image.name);
    formData.append('body', body);
    console.log(image.name);
    this.props.postAdWithImage(formData);
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;

    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post advertisment">
          <WallpaperIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new Advertisment</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                required
                label="ADVERTISMENT"
                multiline
                rows="4"
                placeholder="Caption"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Tooltip title="Post advertisment image" placement="top">
                <IconButton className="button">
                  <AddAPhotoIcon color="primary" />
                </IconButton>
              </Tooltip>

              <input
                type="file"
                required
                id="imageAdCap"
                className={classes.Button}
                //hidden="hidden"
                // onChange={this.handleImageChange}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostAdWithImg.propTypes = {
  postAdWithImage: PropTypes.func.isRequired,
  // postAdImage: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

const mapActionsToprops = {
  postAdWithImage,

  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToprops
)(withStyles(styles)(PostAdWithImg));
