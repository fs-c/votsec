import React from 'react';

import cn from 'classnames';

import { useIsInverted, withHelpers } from './utils';

const Button = withHelpers()(({ children, hero, round, className, ...props }) => {
    const inverted = useIsInverted();

    return (
        <button className={cn(className, { inverted, round, hero })} {...props}>
            <b>{children}</b>

            <style jsx>{`
                button {
                    color: var(--accent-${
                        inverted ? '3' : '5'
                    });
                    background: inherit;
                    border: 1px solid var(--${
                        hero ? 'hero' : inverted ? 'background' : 'foreground'
                    })${hero ? '!important' : ''};

                    transition: border 0.2s, background 0.2s, color 0.2s ease-out;

                    height: 37px;
                    padding: 0 1em;
                    font-size: 0.825em;
                    border-radius: var(--border-radius);

                    text-align: center;
                    justify-content: center;
                }
                
                button.round {
                    width: 37px;
                    border-radius: 19px;
                }

                button b {
                    display: inline-block;
                    overflow: none;
                    z-index: 100;
                    font-weight: 500;
                    position: relative;
                }

                button:hover {
                    color: var(--foreground);
                    background-color: var(--accent-1);
                    border-color: var(--foreground);
                }

                button.inverted:hover {
                    color: var(--background);
                    background-color: var(--accent-8);
                    border-color: var(--background);
                }
            `}</style>
        </button>
    )
});

export default Button;
