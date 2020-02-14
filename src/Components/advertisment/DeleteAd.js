import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import PropTypes from 'prop-types';

//Mui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import DialogTitle from '@material-ui/core/DialogTitle';

//redux
import { connect } from 'react-redux';
import { deleteAd } from '../../redux/actions/dataAction';

const styles = {};

class DeleteAd extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  deleteAd = () => {
    this.props.deleteAd(this.props.adId);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <MyButton
          tip="Delete Advertisment"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </MyButton>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Do you want to do delete this advertisment ?
          </DialogTitle>

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteAd} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteAd.propTypes = {
  deleteAd: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  adId: PropTypes.string.isRequired
};

export default connect(null, { deleteAd })(withStyles(styles)(DeleteAd));
