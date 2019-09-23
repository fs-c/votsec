import React, { useContext } from 'react';

import cn from 'classnames';

import { breakpoint } from '../../styles/constants';

export const InvertionContext = React.createContext(false);

const Container = ({ children, flex, inline, fluid, inverted = false,
    filled, ...props
}) => {
    // TODO: Handle this properly
    const contextInverted = useContext(InvertionContext);
    const actualInverted = inverted || contextInverted;

    return (
        <InvertionContext.Provider value={actualInverted}>
            <div className={cn({ flex, inline, filled, inverted: actualInverted }, 'root')} {...props}>
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

                    @media (min-width: ${breakpoint.tablet}) {
                        .root.flex {
                            flex-wrap: nowrap;
                        }
                    }

                    .root.inline {
                        padding: 0;
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
