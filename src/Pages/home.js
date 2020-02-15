import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

//components

import Profile from '../Components/Profile';
import Ad from '../Components/advertisment/Ad.js';

//import Drawer2 from '../Components/Drawer2';
import Drawer from '../Components/Drawer';
//redux
import { connect } from 'react-redux';
import { getAds } from '../redux/actions/dataAction';

//material-ui
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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

    const { adIdParam } = this.state;
    const { classes } = this.props;

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

    return (
      <div>
        <Grid container spacing={2}>
          <Grid item sm={2} xs={12}>
            <Drawer />
          </Grid>
          <Grid item sm={7} xs={12}>
            {recentAdsMarkup}
          </Grid>
          <Grid item sm={3} xs={12}>
            <Profile />
          </Grid>
        </Grid>
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
