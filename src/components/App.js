import React from 'react';

import StepsPane from './StepsPane';
import Navigation from './Navigation';

import globals from '../styles/globals';

import { Spacer } from './lib/utils';
import Container from './lib/Container';

const App = () => {
    return <>
        <style jsx global>{globals}</style>

        <Container inverted inline fluid>
            <Navigation />
        </Container>

        <Spacer large />

        {/* <Container flex inline>
            <Container flex>
                <StepsPane />
            </Container>

            <Container flex>
                Heya.
            </Container>
        </Container> */}

        {/* <Container flex style={{ backgroundColor: 'var(--error)' }}>
            <Container flex style={{ backgroundColor: 'var(--success)', height: '100vh' }} />

            <Container flex style={{ backgroundColor: 'var(--warning)', height: '100vh' }} />
        </Container> */}
    </>
};

export default App;
