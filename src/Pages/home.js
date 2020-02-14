import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import ReviewSkeleton from '../util/skeltons/ReviewSkelton';
import StripeCheckout from 'react-stripe-checkout';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
//components
import Cover from '../Components/Cover.js';
import Review from '../Components/Review.js';
import Profile from '../Components/Profile';
import About from '../Components/About';
import Ad from '../Components/advertisment/Ad.js';

import PostPaidAd from '../Components/PostPaidAd';

//import Drawer2 from '../Components/Drawer2';
import Drawer from '../Components/Drawer';
//redux
import { connect } from 'react-redux';
import { getAds } from '../redux/actions/dataAction';

//material-ui
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  },
  gridList: {
    width: 800,
    height: 500,
    transform: 'translateZ(0)'
  }
};

export class home extends Component {
  state = {
    adId: null,
    product: {
      name: 'adverstisment',
      price: 0.99
    },
    paid: false
  };

  componentDidMount() {
    this.props.getAds();

    const adId = this.props.match.params.adId;
    if (adId) this.setState({ adIdParam: adId });
  }

  // handleToken = (token, addresses) => {
  //   console.log(token, addresses);

  //   axios
  //     .post('/checkout', { token })
  //     .then(res => {
  //       console.log(res.data);
  //       if (res.data === 'success') {
  //         toast('success ! check emails for details', { type: 'success' });
  //       } else {
  //         toast('something went wrong', { type: 'error' });
  //       }
  //     })
  //     .catch(err => console.log(err));
  // };

  handleToken = async (token, addresses) => {
    const response = await axios.post('/checkout', { token });

    const { status } = response.data;
    console.log('Response:', response.data);
    if (status === 'success') {
      toast('Success! Check email for details', { type: 'success' });
      this.setState({ paid: true });
    } else {
      toast('Something went wrong', { type: 'error' });
    }
  };

  render() {
    const { ads, loading } = this.props.data;
    const { reviews } = this.props.user;
    const { adIdParam } = this.state;
    const { classes } = this.props;

    // let recentAdsMarkup = !loading ?  (
    //   ads.map(ad => <Ad key={ad.adId} ad={ad} />)
    // ) : (
    //   <h1>Loading..</h1>
    // );

    const recentAdsMarkup = loading ? (
      <h1>Loading..</h1>
    ) : ads.length === 0 ? (
      <Card className={classes.Card}>
        <CardContent className={classes.content}>
          <h3>No ads from this user</h3>
        </CardContent>
      </Card>
    ) : !adIdParam ? (
      ads.map(ad => <Ad key={ad.adId} ad={ad} />)
    ) : (
      ads.map(ad => {
        if (ad.adId !== adIdParam) return <Ad key={ad.adId} ad={ad} />;
        else return <Ad key={ad.adId} ad={ad} openDialog />;
      })
    );

    // let recentReviewsMarkup = !loading ? (
    //   reviews.map(review => <Review key={review.reviewId} review={review} />)
    // ) : (
    //   <ReviewSkeleton />
    // );

    const recentReviewsMarkup = loading ? (
      <ReviewSkeleton />
    ) : reviews.length === 0 ? (
      <Card className={classes.Card}>
        <CardContent className={classes.content}>
          <h3>No reviews yet</h3>
        </CardContent>
      </Card>
    ) : (
      <Card className={classes.Card}>
        <GridList
          cellHeight={150}
          spacing={1}
          className={classes.gridList}
          cols={1}
        >
          {reviews.map(review => (
            <GridListTile key={review.reviewId} cols={1} rows={1}>
              <Review key={review.reviewId} review={review} />
            </GridListTile>
          ))}
        </GridList>
      </Card>
    );

    //const checkPaid = this.state.paid ? <PostPaidAd openDialog /> : null;

    return (
      <div>
        <Drawer />
      </div>
    );
  }
}

home.propTypes = {
  getAds: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data,
  user: state.user
});

export default connect(mapStateToProps, { getAds })(withStyles(styles)(home));
