import React from 'react';

import Header from './lib/Header';
import Container from './lib/Container';

const DesignLab = () => (<>
    <Header>
        <Container flex>
            <Header.Link main to='/' router>
                votsec
            </Header.Link>

            <Header.Link to='lab' router>
                design lab
            </Header.Link>
        </Container>
    </Header>
</>);

export default DesignLab;
