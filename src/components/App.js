import React from 'react';
import { Router } from '@reach/router';
import { ThemeProvider } from 'theme-ui'

import { Box } from 'reflexbox';
import Navigation from './Navigation';

import theme from '../theme';

const App = () => (
    <ThemeProvider theme={theme}>
        <Box height='100vh' variant='dark'>
            <Navigation />
        </Box>
    </ThemeProvider>
);

export default App;
