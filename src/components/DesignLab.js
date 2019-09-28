import React from 'react';

import { LiveProvider, LivePreview, LiveEditor, LiveError } from 'react-live';

import Header from './lib/Header';
import Button from './lib/Button';
import Container from './lib/Container';

const DesignSection = ({ children, info, fluid, ...props }) => (
    <Container fluid padding={fluid ? 'py' : '1em'} style={{
        borderBottom: '1px solid var(--accent-2)',
        backgroundColor: info ? 'var(--accent-1)' : 'inherit',
    }}>
        <Container fluid={fluid} {...props}>
            {children}
        </Container>
    </Container>
);

const DesignPlayground = ({ code }) => (
    <LiveProvider scope={{ Container, Header, Button }} code={code.trim()}>
        <LivePreview />

        <Container style={{
            caretColor: 'white',
            backgroundColor: '#282C4F',
            borderBottomLeftRadius: 'var(--border-radius)',
            borderBottomRightRadius: 'var(--border-radius)',
        }}>
            <LiveError style={{
                margin: '0',
                color: 'white',
                whiteSpace: 'pre-wrap',
                padding: '0.75em 1em 0 1em',
                borderBottom: '1px solid var(--error)',
            }} />

            <LiveEditor padding='1rem' />
        </Container>
    </LiveProvider>
);

const DesignLab = () => (<>
    <Header border>
        <Container row padding='px'>
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
                In general, no component should make any assumptions about, or 
                explicitly modify, its width. Exceptions are e.g. made 
                for <code>Container</code>s (of course), and <code>Button</code>s.
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

        <p>
            These principles exist to serve as <i>guidelines</i>, aiding in the design 
            and development of reusable and predictable components. They are neither 
            set in stone nor without exceptions.
        </p>
    </DesignSection>

    <DesignSection fluid>
        <Container>
            <h3>Container</h3>

            <p>
                With some exceptions, the container is the only instance that should 
                make any decisions about the width of elements (itself and its 
                children). It uses Flexbox by default and can easily be made responsive.
            </p>

            <p>
                A padding of <code>1em</code> is applied to the left and right 
                side respectively when the container is not <code>fluid</code> - 
                this condition can be overridden with the <code>padded</code> prop. 
            </p>

            <p>
                Containers can also act as an <code>InvertionProvider</code> through 
                the <code>inverted</code> prop, letting their children know that they 
                should have an inverted color scheme.
            </p>
        </Container>

        <DesignPlayground code={`
<Container fluid style={{
    backgroundColor: 'var(--success-light)', padding: '1em', color: 'white',
}}>
    <span style={{ paddingBottom: '0.5em' }}>Fluid container</span>

    <Container style={{
        backgroundColor: 'var(--success)', color: 'white',
    }}>
        <span style={{ padding: '1em' }}>Regular container (row)</span>

        <Container row directions={[ 'column', 'row', 'row' ]}>
            <Container flex={1} style={{ padding: '1em', border: '1px solid var(--success-light)' }}>
                Container 1 (flex=1)
            </Container>

            <Container flex={2} style={{ padding: '1em', border: '1px solid var(--success-light)' }}>
                Container 2 (flex=2)
            </Container>

            <Container flex={'0 0 150px'} style={{ padding: '1em', border: '1px solid var(--success-light)' }}>
                Container 3 (flex=0 0 150px)
            </Container>
        </Container>

        <Container row directions={[ 'column', 'row', 'row' ]}>
            <Container>
                <Container style={{ padding: '1em', border: '1px solid var(--success-dark)' }}>
                    Vertically aligned 1
                </Container>

                <Container style={{ padding: '1em', border: '1px solid var(--success-dark)' }}>
                    Vertically aligned 2
                </Container>
            </Container>

            <Container style={{ padding: '1em' }}>
                Horizontally aligned
            </Container>
        </Container>
    </Container>
    
    <Container filled inverted style={{ padding: '1em' }}>
        Filled (sets default background, respecting invertion) and inverted container
    </Container>
</Container>
        `}/>
    </DesignSection>

    <DesignSection fluid>
        <Container>
            <h3>Header and Button</h3>

            <p>
                <code>Header.Link</code> supports <code>@reach/router</code> links 
                which can be used through the <code>router</code> prop.
            </p>
        </Container>

        <DesignPlayground code={`<>
<Container fluid inverted>
    <Header style={{ padding: '0 1em 0 1em' }}>
        <Container row>
            <Header.Link to='/' router main style={{ marginRight: '1em' }}>
                ACME
            </Header.Link>

            <Header.Link to='/pricing' router>
                Pricing
            </Header.Link>

            <Header.Seperator />

            <Header.Link to='mailto:hello@acme.tld'>
                Contact
            </Header.Link>

            <Header.Link to='/about' router>
                <Button>
                    Sign Up
                </Button>
            </Header.Link>
        </Container>
    </Header>
</Container>

<Header style={{ padding: '0 1em 0 1em' }}>
    <Container row>
        <Header.Link to='/' router main style={{ marginRight: '1em' }}>
            ACME
        </Header.Link>

        <Header.Link to='/pricing' router>
            Pricing
        </Header.Link>

        <Header.Seperator />

        <Header.Link to='mailto:hello@acme.tld'>
            Contact
        </Header.Link>

        <Header.Link to='/about' router>
            <Button>
                Sign Up
            </Button>
        </Header.Link>
    </Container>
</Header>
</>
        `}/>
    </DesignSection>
</>);

export default DesignLab;
