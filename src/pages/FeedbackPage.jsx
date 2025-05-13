import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeedbackContainer from '../components/FeedbackContainer';

const FeedbackPage = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#121212'
    }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, py: 4, px: 2 }}>
        <FeedbackContainer />
      </Box>
      <Footer />
    </Box>
  );
};

export default FeedbackPage;