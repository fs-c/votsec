import React from 'react';

import Header from './lib/Header';
import Container from './lib/Container';

const DesignSection = ({ children, info, ...props }) => (
    <Container inline fluid style={{
        paddingTop: '0.75em', borderBottom: '1px solid var(--accent-2)',
        backgroundColor: info ? 'var(--accent-1)' : 'inherit',
    }}>
        <Container {...props}>
            {children}
        </Container>

        <style jsx>{`
        `}</style>
    </Container>
);

const DesignLab = () => (<>
    <Header border>
        <Container flex>
            <Header.Link main to='/' router style={{ borderRight: '1px solid var(--hero)' }}>
                votsec
            </Header.Link>

            <Header.Link to='lab' router style={{ marginLeft: '0.5em' }}>
                design lab
            </Header.Link>
        </Container>
    </Header>

    <DesignSection info>
        <h3>Principles</h3>

        <ul>
            <li>
                In general, no component should make any assumptions about or explicitly 
                modify its width. Exceptions are e.g. made for <code>Button</code>s.
            </li>

            <li>
                Whenever a component sets any kind of <code>color</code>, an 
                inverted variant should also be provided.
            </li>

            <li>
                Avoid using magic numbers (including colors), use CSS variables 
                (<code>lib/styles/globals.js</code>) or constants 
                (<code>lib/styles/constants.js</code>) instead.
            </li>

            <li>
                A component should always pass unused props to the root 
                HTML element, allowing for custom <code>style</code>, <code>id</code> and friends.
            </li>
        </ul>
    </DesignSection>
</>);

export default DesignLab;
