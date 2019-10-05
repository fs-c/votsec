import React from 'react';

import { Container } from './lib/utils';
import Octicon, { Beaker, MarkGithub } from '@primer/octicons-react';
import { Navbar, Button, Divider, Colors, Alignment } from '@blueprintjs/core';

const Navigation = (props) => (
    <Navbar style={{ backgroundColor: Colors.BLACK }} {...props}>
        <Container>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>
                    <Button minimal text='votsec' />
                </Navbar.Heading>
                <Divider />
                <Button minimal icon={<Octicon icon={Beaker} />} />
                <Button minimal icon={<Octicon icon={MarkGithub} />} />
            </Navbar.Group>

            <Navbar.Group align={Alignment.RIGHT}>
                <Button minimal text='Login' />
                <Divider />
                <Button text='Join Now' intent='primary' />
            </Navbar.Group>
        </Container>
    </Navbar>
);

export default Navigation;
