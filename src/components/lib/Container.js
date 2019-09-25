import React from 'react';

import cn from 'classnames';

import { useIsInverted } from './utils';
import { breakpoints } from './styles/constants';

export const InvertionContext = React.createContext(false);

const Container = ({
    children,   /* Get rendered inside the container */
    row,        /* Makes this container a row, children will be columns */
    flex,       /* Passed to CSS flex, <flex-grow> <flex-shrink> <flex-basis> */
    fluid,      /* Sets max-width to 100%, disregarding the page-width variable */
    filled,     /* Sets an appropiate, invertion respecting, background-color */
    inverted,   /* Inverts the coloring of itself and child elements */
    ...props,
}) => {
    const contextInverted = useIsInverted();
    // TODO: Should an invertion up in the chain invert the child invertion?
    const actualInverted = inverted || contextInverted;

    return (
        <InvertionContext.Provider value={actualInverted}>
            <div className={cn('container', { filled })} {...props}>
                {children}

                <style jsx>{`
                    .container {
                        width: 100%;

                        overflow: hidden;

                        margin-right: auto;
                        margin-left: auto;

                        display: flex;
                    }

                    @media (min-width: ${breakpoints.tablet}) {
                        /* TODO: Should this be customisable? */
                        .container {
                            flex-direction: column;
                        }
                    }
                `}</style>

                <style jsx>{`
                    .container {
                        max-width: ${fluid ? '100%' : 'var(--page-width)'};

                        flex: ${flex};
                        flex-direction: ${row ? 'row' : 'column'};
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
