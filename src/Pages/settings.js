import React, { Component } from 'react';
import Sidebar from '../Components/Sidebar';
import Grid from '@material-ui/core/Grid';

export default class settings extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item sm={4} xs={12}>
            <Sidebar />
          </Grid>

          <Grid item sm={8} xs={12}>
            <p>pages</p>
          </Grid>
        </Grid>
      </div>
    );
  }
}
