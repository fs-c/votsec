import React from 'react';

import cn from 'classnames';

import { breakpoints } from './styles/constants';
import { useIsInverted, withHelpers } from './utils';

export const InvertionContext = React.createContext(false);

const Container = withHelpers()(({
    children,   /* Get rendered inside the container */
    row,        /* Makes this container a row, children will be columns */
    flex,       /* Passed to CSS flex, <flex-grow> <flex-shrink> <flex-basis> */
    fluid,      /* Sets max-width to 100%, disregarding the page-width variable */
    filled,     /* Sets an appropiate, invertion respecting, background-color */
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
            <div className={cn('container', className, { filled })}
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
                    }
                `}</style>

                <style jsx>{`
                    .container {
                        max-width: ${fluid ? '100%' : 'var(--page-width)'};

                        flex: ${flex || 'inherit'};
                        flex-direction: ${directions[0]};
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

                    .filled.container {
                        background-color: var(--${actualInverted ? 'foreground' : 'background'});
                    }
                `}</style>
            </div>
        </InvertionContext.Provider>
    );
});

const Box = withHelpers()(({ children, className, ...props }) => (
    <div className={cn('box', className)} {...props}>
        {children}

        <style jsx>{`
            .box {
                width: auto;
                overflow: hidden;
            }
        `}</style>
    </div>
));

Container.Box = Box;

export default Container;
