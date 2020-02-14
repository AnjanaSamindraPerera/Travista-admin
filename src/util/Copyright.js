import React from 'react';

import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
// import red from '@material-ui/core/colors/red';

export default () => {
  return (
    <Typography variant="body2" color="secondary" align="center">
      {'Copyright © '}
      <Link color="primary" to="http://localhost:3000/">
        Travista
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};
