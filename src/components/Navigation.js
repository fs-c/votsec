import React from 'react';
import { Match, Link } from '@reach/router';

import { Flex, Box } from 'reflexbox';
import Octicon, { Beaker, MarkGithub } from '@primer/octicons-react';

const NavigationLink = ({ children, to }) => (
    <Box>
        <Match path={`${to}/*`}>
            {({ match }) => (
                <Link to={to}>
                    {children}
                </Link>
            )}
        </Match>
    </Box>
);

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

export default Navigation;
