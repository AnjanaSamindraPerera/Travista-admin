import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//mui
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//redux
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataAction';

const styles = {
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20
  },
  textField: {
    margin: '10px auto 2px auto'
  },
  button: {
    marginTop: 20,
    marginLeft: 20,
    position: 'relative'
  }
};

class Comment extends Component {
  state = {
    body: '',
    errors: {}
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '' });
    }
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.submitComment(this.props.adId, { body: this.state.body });
  };

  render() {
    const { classes, authenticated } = this.props;

    const commentFormMarkup = authenticated ? (
      <Grid item sm={12} style={{ textAlign: 'center' }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            variant="outlined"
            type="text"
            label="comment on advertisment"
            error={this.state.errors.comment ? true : false}
            helperText={this.state.errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            className={classes.textField}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Comment
          </Button>
        </form>
        <hr className={classes.visibleSeperator} />
      </Grid>
    ) : null;
    return commentFormMarkup;
  }
}

Comment.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  adId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

export default connect(
  mapStateToProps,
  { submitComment }
)(withStyles(styles)(Comment));
