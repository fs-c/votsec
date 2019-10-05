import React from 'react';
import { Router } from '@reach/router';

import { Classes, Colors } from '@blueprintjs/core';
import Navigation from './Navigation';
import { Flex, Container } from './lib/utils';

import { siteWidth } from '../constants';

const Home = () => (<>
    <Flex style={{ height: '100vh', backgroundColor: Colors.BLACK }}
        className={Classes.DARK}
    >
        <Navigation />

        <Flex direction='row' style={{ flexGrow: 1 }}>
            <Container style={{ paddingBottom: '4em', alignSelf: 'center' }}>
                <h1 className='hero-header'>
                    Vote your <span className='hero-highlight'>mind</span>
                </h1>
            </Container>
        </Flex>

        <style jsx>{`
            .hero-header {
                margin: 0;
                font-size: 5em;
                text-align: center;
            }

            .hero-highlight {
                color: ${Colors.BLUE1};
            }

            @media (min-width: ${siteWidth}) {
                .hero-header {
                    font-size: 7.5em;
                }
            }
        `}</style>
    </Flex>
</>);

const Lab = () => (
    <p>
        This is the lab
    </p>
);

const App = () => (
    <Router>
        <Home path='/' />
        <Lab path='/lab' />
    </Router>
);

export default App;
