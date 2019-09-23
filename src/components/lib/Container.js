import React, { useContext } from 'react';

import cn from 'classnames';

import { breakpoint } from '../../styles/constants';

export const InvertionContext = React.createContext(false);

const Container = ({ children, flex, inline, fluid, inverted = false,
    filled, center, ...props
}) => {
    // TODO: Handle this properly
    const contextInverted = useContext(InvertionContext);
    const actualInverted = inverted || contextInverted;

    return (
        <InvertionContext.Provider value={actualInverted}>
            <div {...props} className={cn({
                    flex, inline, filled, center, inverted: actualInverted
                }, 'root')}
            >
                {children}

                <style jsx>{`
                    .root {
                        width: 100%;

                        padding-right: 15px;
                        padding-left: 15px;
                        margin-right: auto;
                        margin-left: auto;
                    }

                    .root.flex {
                        display: flex;
                        flex-wrap: wrap;
                    }

                    .root.flex.center {
                        justify-content: center;
                    }

                    @media (min-width: ${breakpoint.tablet}) {
                        .root.flex {
                            flex-wrap: nowrap;
                        }
                    }

                    .root.inline {
                        padding: 0;
                    }

                    .root.filled {
                        background-color: var(--background);
                    }

                    .root.filled.inverted {
                        background-color: var(--foreground);
                    }
                `}</style>

                <style jsx>{`
                    .root {
                        max-width: ${fluid ? '100%' : 'var(--page-width)'}
                    }
                `}</style>
            </div>
        </InvertionContext.Provider>
    )
};

export default Container;
