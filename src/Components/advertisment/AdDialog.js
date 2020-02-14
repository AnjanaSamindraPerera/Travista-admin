import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import MyButton from '../../util/MyButton';

// import DeleteAd from './DeleteAd';
import Like from './Like';
import Comment from './Comment';
import Comments from './Comments';

//MUI stuff
import CircularProgress from '@material-ui/core/CircularProgress';

//icons
import CloseIcon from '@material-ui/icons/Close';

//form dialogs
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

//material-ui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

//icons
import ChatIcon from '@material-ui/icons/Chat';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
//style
import './Ad.css';

//redux
import { connect } from 'react-redux';
import { getAd, clearErrors } from '../../redux/actions/dataAction';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 20,
    minHeight: 20
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  },
  closeButton: {
    position: 'absolute',
    left: '85%',
    marginBottom: 50,
    marginTop: 20
  },
  DialogContent: {
    padding: 20
  },
  expandButton: {
    position: 'absolute',
    left: '60%'
  },
  load: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  },
  invisibleSeparator: {
    border: 'none',
    margin: 4
  },
  visibleSeperator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20
  }
};

class AdDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: ''
  };

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  // componentWillReceiveProps = nextProps => {
  //   if (nextProps.openDialog === true) {
  //     console.log('in open dialog');
  //     this.handleOpen();
  //   }
  // };

  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { userHandle, adId } = this.props;

    //constructing a url when open a advertisment
    const newPath = encodeURI(`/user/${userHandle}/ad/${adId}`);

    if (oldPath === newPath) {
      //when checking notifications
      oldPath = newPath;
    }

    window.history.pushState(null, null, newPath);
    this.setState({ open: true, oldPath, newPath });
    this.props.getAd(this.props.adId);
  };

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();

    if (this.state.oldPath === this.state.newPath) {
      //only happens when checking notifications
      window.location.href = '/';
    }
  };

  render() {
    const {
      classes,
      ad: {
        adId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        adImage,
        userHandle,
        comments
      },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.load}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Card className="Post">
        <div className="Post-user">
          <div className="Post-user-avatar">
            <img src={userImage} alt="Chris" />
          </div>
          <Typography variant="h5" color="primary">
            {userHandle}
          </Typography>
          <div className="Post-caption">
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
          </div>
        </div>
        {/* {deleteButton} */}
        <CardContent className={classes.content}>
          <div className="Post-caption">
            <strong>{body}</strong>
          </div>

          <div className="Post-image">
            <div className="Post-image-bg">
              <img
                alt=""
                src={adImage}
                onError={e => (e.target.style.display = 'none')}
              />
            </div>
          </div>
          <Like adId={adId} />
          <span>{likeCount} Likes</span>

          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>

          <span>{commentCount} comments</span>
        </CardContent>
        <hr className={classes.visibleSeperator} />
        <Comment adId={adId} />
        <Comments comments={comments} />
      </Card>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand Ad"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
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

          <DialogContent className={classes.DialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

AdDialog.propTypes = {
  getAd: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  adId: PropTypes.string.isRequired,
  ad: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  ad: state.data.ad,
  UI: state.UI
});

const mapActionToProps = {
  getAd,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(AdDialog));
