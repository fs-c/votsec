import React from 'react';

import Octicon, { MarkGithub } from '@primer/octicons-react'

import Button from './lib/Button';
import Header from './lib/Header';
import Container from './lib/Container';

const Navigation = () => (
    <Header>
        <Container flex>
            <Header.Link to='/' router main>
                {/* <Octicon icon={Beaker} size='medium' /> */}
                votsec
            </Header.Link>

            {/* <Header.Link to='/about' router>
                About
            </Header.Link>

            <Header.Link to='/blog' router>
                Blog
            </Header.Link> */}

            <Header.Link to='https://github.com/LW2904/votsec'>
                <Octicon icon={MarkGithub} />                    
            </Header.Link>

            <Header.Seperator />

            <Header.Link to='/login' router>
                Login
            </Header.Link>

            <Header.Link to='/register' router>
                <Button color='var(--accent-5)'>
                    Join Now
                </Button>
            </Header.Link>
        </Container>
    </Header>
);

export default Navigation;
