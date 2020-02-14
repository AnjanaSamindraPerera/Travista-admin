import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//MUI stuff

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'; //five info when hover over

//icons

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

//redux
import { connect } from 'react-redux';
import { uploadAdImage } from '../redux/actions/dataAction';

const styles = theme => ({
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
}); //wrap around () to return from function straight away

class PostAdImage extends Component {
  handleEditPicture = () => {
    const fileInput = document.getElementById('imageAd');
    fileInput.click();
  };

  handleImageChange = event => {
    // console.log('in cover1');
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);

    this.props.uploadAdImage(formData);
  };

  render() {
    return (
      <div>
        <Tooltip title="Post advertisment image" placement="top">
          <IconButton onClick={this.handleEditPicture} className="button">
            <AddAPhotoIcon color="primary" />
          </IconButton>
        </Tooltip>
        <input
          type="file"
          id="imageAd"
          hidden="hidden"
          onChange={this.handleImageChange}
        />
      </div>
    );
  }
}

PostAdImage.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  uploadAdImage: PropTypes.func.isRequired
};

const mapActionsToProps = { uploadAdImage };

const mapStateToProps = state => ({
  user: state.user
});
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostAdImage));
