import React from 'react';

import Container from './lib/Container';

const WorkflowItem = ({ number, children }) => (
    <Container row>
        <Container flex={1} style={{ alignSelf: 'center' }}>
            {number}
        </Container>

        <Container flex={99}>
            {children}
        </Container>
    </Container>
);

const Workflow = () => (
    <Container fluid>
        <WorkflowItem number={1}>
            Some content.
        </WorkflowItem>

        <WorkflowItem number={2}>
            Some other content.
        </WorkflowItem>

        <WorkflowItem number={3}>
            Some very exciting content.
        </WorkflowItem>
    </Container>
);

export default Workflow;
