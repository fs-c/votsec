import React from 'react';

import cn from 'classnames';

import { useIsInverted } from './utils';

const Button = ({ children, style, hero }) => {
    const inverted = useIsInverted();

    return (
        <button style={style} className={cn({ inverted, hero })}>
            <b>{children}</b>

            <style jsx>{`
                button {
                    color: var(--accent-5);
                    background: inherit;
                    border: 1px solid var(--foreground);

                    transition: border 0.2s, background 0.2s, color 0.2s ease-out;

                    height: 2.5em;
                    padding: 0 1em;
                    font-size: 0.825em;
                    border-radius: 5px;

                    text-align: center;
                    justify-content: center;
                }

                button.hero {
                    border: 1px solid var(--hero)!important;
                }

                button.inverted {
                    color: var(--accent-3);
                    border: 1px solid var(--background);
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
};

export default Button;
