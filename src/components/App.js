import React from 'react';

import Hero from './Hero';
import Navigation from './Navigation';

import globals from '../styles/globals';

import { Spacer } from './lib/utils';
import Container from './lib/Container';

const App = () => {
    return <>
        <style jsx global>{globals}</style>

        <Container inverted inline fluid>
            <Navigation />

            <Hero />
        </Container>

        <Spacer large />
    </>
};

export default App;
