import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//material-ui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 5
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

class Review extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      review: { body, travelerId, createdAt, travelerImage }
    } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          {travelerImage ? (
            <CardMedia
              image={travelerImage}
              title="profile image"
              className={classes.image}
            />
          ) : null}

          <CardContent className={classes.content}>
            <Typography variant="h5" color="primary">
              {travelerId}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
            <br />
            <Typography variant="body1" color="textSecondary">
              {body}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Review);
