import React from 'react';
import { ThemeProvider } from 'theme-ui'

import { Flex, Box } from 'reflexbox';
import Octicon, { Beaker, MarkGithub } from '@primer/octicons-react';

import theme from '../theme';

const Navigation = () => (
    <Flex justifyContent='space-between' fontFamily='body' p={3}>
        <Flex>
            <Box sx={{
                ':hover': {
                    color: 'primary',
                }
            }}>
                <b>votsec</b>
            </Box>

            <Box ml={3}>
                <Octicon icon={MarkGithub} />
            </Box>

            <Box ml={2}>
                <Octicon icon={Beaker} />
            </Box>
        </Flex>
    </Flex>
);

const App = () => (
    <ThemeProvider theme={theme}>
        <Box height='100vh' variant='dark'>
            <Navigation />
        </Box>
    </ThemeProvider>
);

export default App;
