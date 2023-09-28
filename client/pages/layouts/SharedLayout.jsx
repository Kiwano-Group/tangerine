// SharedLayout.jsx
import React from 'react';
import Grid from '@mui/material/Grid';
import LeftSide from '../../components/LeftSide.jsx';

function SharedLayout({ children }) {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      {/* LeftSide component */}
      <LeftSide />

      {/* Dynamic Right Side */}
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        sx={{
          backgroundColor: '#F4F4F4',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 3,
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
}

export default SharedLayout;
