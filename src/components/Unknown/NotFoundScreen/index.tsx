import { Box, Typography } from '@mui/material';
import React from 'react';

const NotFoundScreen: React.FC = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h1">Page Not Found</Typography>
    </Box>
  );
};

export default NotFoundScreen;
