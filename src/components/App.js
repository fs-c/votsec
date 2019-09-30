import React from 'react';
import { Router } from '@reach/router';

import Octicon, { ChevronUp, ChevronDown } from '@primer/octicons-react';

import Hero from './Hero';
import Workflow from './Workflow';
import Navigation from './Navigation';

import DesignLab from './DesignLab';

import globals from './lib/styles/globals';

import List from './lib/List';
import Button from './lib/Button';
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

const VoteButton = ({ yes, no, ...props }) => (
    <Button round border='0px solid black' {...props}>
        {yes ? <Octicon icon={ChevronUp} /> : no ? <Octicon icon={ChevronDown} /> : ''}
    </Button>
);

const _Hero = () => {

    return (
        <List m='1em'>
            <List.Item>
                <Container row justify='space-between' align='center'>
                    <Container.Box>
                        Heya
                    </Container.Box>

                    <Container.Box >
                        <VoteButton yes mr='0.5em' />
                        <VoteButton no />
                    </Container.Box>
                </Container>
            </List.Item>
        </List>
    );
};

const Home = () => (<>
    <Container inverted filled fluid h='100vh'>
        <Navigation />

        <Container>
            <_Hero />
        </Container>
    </Container>

    {/* <Spacer large />

    <Container px='1em'>
        <Workflow />
    </Container> */}
</>);

export default App;
