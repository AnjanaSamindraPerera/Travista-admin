import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

//Redux
import { connect } from 'react-redux';
import { likeAd, unlikeAd } from '../../redux/actions/dataAction';

export class Like extends Component {
  likedAd = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.adId === this.props.adId)
    )
      return true;
    else return false;
  };
  likeAd = () => {
    this.props.likeAd(this.props.adId);
  };
  unlikeAd = () => {
    this.props.unlikeAd(this.props.adId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedAd() ? (
      <MyButton tip="Undo like" onClick={this.unlikeAd}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeAd}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

Like.propTypes = {
  user: PropTypes.object.isRequired,
  adId: PropTypes.string.isRequired,
  likeAd: PropTypes.func.isRequired,
  unlikeAd: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeAd,
  unlikeAd
};

export default connect(mapStateToProps, mapActionsToProps)(Like);
