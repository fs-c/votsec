import React from 'react';

import { DiagonalSeparator, useIsInverted } from './lib/utils';
import Container from './lib/Container';

const Hero = () => {
    const inverted = useIsInverted();

    return (<>
        <Container filled inline fluid flex>
            <Container flex center>
                <div>
                    <h1>
                        Vote your <span>mind</span>
                    </h1>
                </div>
            </Container>
        </Container>

        <Container inline fluid flex>
            <DiagonalSeparator width={15} height={8} />
            <DiagonalSeparator width={85} height={8} reversed />
        </Container>

        <style jsx>{`
            div {
                color: var(--${inverted ? 'background' : 'foreground'});
                padding: 0.75em 0 1em 0;
            }

            div h1 {
                line-height: 1em;
                text-align: center;
                font-size: 6vmax;
            }

            div h1 span {
                color: var(--hero);
            }
        `}</style>
    </>);
};

export default Hero;
