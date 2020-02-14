import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

//components
import AdDialog from '../Components/advertisment/AdDialog.js';

//redux
import { connect } from 'react-redux';
import { getAds } from '../redux/actions/dataAction';

export class home extends Component {
  state = {
    adId: null
  };

  componentDidMount() {
    this.props.getAds();

    const adId = this.props.match.params.adId;
    if (adId) this.setState({ adIdParam: adId });
  }

  render() {
    const { ads, loading } = this.props.data;
    const { adIdParam } = this.state;
    const {
      user: {
        credentials: { handle }
      }
    } = this.props;

    let recentAdsMarkup = !loading ? (
      ads
        .filter(ad => ad.adId === adIdParam)
        .map(ad => (
          <AdDialog
            key={ad.adId}
            ad={ad}
            adId={ad.adId}
            userHandle={handle}
            openDialog
          />
        ))
    ) : (
      <h1> </h1>
    );

    return (
      <div>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            {recentAdsMarkup}
          </Grid>
          <Grid item sm={6}></Grid>
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

export default connect(mapStateToProps, { getAds })(home);
