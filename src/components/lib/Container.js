import React from 'react';

import cn from 'classnames';

import { useIsInverted } from './utils';
import { breakpoints, pageWidth } from './styles/constants';

export const InvertionContext = React.createContext(false);

const Container = ({
    children,   /* Get rendered inside the container */
    row,        /* Makes this container a row, children will be columns */
    flex,       /* Passed to CSS flex, <flex-grow> <flex-shrink> <flex-basis> */
    fluid,      /* Sets max-width to 100%, disregarding the page-width variable */
    filled,     /* Sets an appropiate, invertion respecting, background-color */
    padded,     /* Adds padding on the left and right _if on mobile_ */
    inverted,   /* Inverts the coloring of itself and child elements */
    className,
    directions = row ? [ 'row', 'row', 'row' ] : [ 'column', 'column', 'column' ],
    ...props,
}) => {
    const contextInverted = useIsInverted();
    // TODO: Should an invertion up in the chain invert the child invertion?
    const actualInverted = inverted || contextInverted;

    return (
        <InvertionContext.Provider value={actualInverted}>
            <div className={cn('container', className, { filled, padded: padded || !fluid })}
                {...props}
            >
                {children}

                <style jsx>{`
                    .container {
                        width: 100%;

                        overflow: hidden;

                        margin-right: auto;
                        margin-left: auto;

                        display: flex;
                        flex-direction: ${directions[0]};
                    }

                    .padded.container {
                        padding: 0 1em 0 1em;
                    }

                    @media (min-width: ${breakpoints.get('tablet')}) {
                        .container {
                            flex-direction: ${directions[1]};
                        }
                    }

                    @media (min-width: ${breakpoints.get('desktop')}) {
                        .container {
                            flex-direction: ${directions[2]};
                        }
                    }
                `}</style>

                <style jsx>{`
                    .container {
                        max-width: ${fluid ? '100%' : 'var(--page-width)'};

                        flex: ${flex || 'inherit'};
                    }

                    .filled.container {
                        background-color: var(--${actualInverted ? 'foreground' : 'background'});
                    }
                `}</style>
            </div>
        </InvertionContext.Provider>
    );
};

export default Container;
