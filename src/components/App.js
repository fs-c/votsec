import React from 'react';
import { Router } from '@reach/router';

import Hero from './Hero';
import Workflow from './Workflow';
import Navigation from './Navigation';

import DesignLab from './DesignLab';

import globals from './lib/styles/globals';

import { Spacer } from './lib/utils';
import Container from './lib/Container';

const App = () => {
    return <>
        <style jsx global>{globals}</style>

        <Router>
            <Home path='/' />
            <DesignLab path='lab' />
        </Router>
    </>
};

const Home = () => (<>
    <Container inverted fluid>
        <Navigation />

        <Hero />
    </Container>

    <Spacer large />

    <Container>
        <Workflow />
    </Container>
</>);

export default App;
