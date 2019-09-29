import React from 'react';
import { Match, Link } from '@reach/router';

import cn from 'classnames';

import { withHelpers, useIsInverted } from './utils';

const Header = withHelpers()(({ children, className, border, ...props }) => {
    const inverted = useIsInverted();

    return (
        <header className={cn(className, { inverted, border })} {...props}>
            {children}

            <style jsx>{`
                header {
                    height: 4em;

                    display: flex;
                    flex-direction: row;
                }

                header.inverted {
                    color: var(--background);
                    background-color: var(--foreground);
                }

                header.border {
                    border-bottom: 1px solid var(--accent-2);
                }
            `}</style>
        </header>
    );
});

const HeaderSeperator = withHelpers()(({ children, ...props }) => (
    <div {...props}>
        {children}

        <style jsx>{`
            div {
                flex-grow: 1;
            }
        `}</style>
    </div>
));

const HeaderLink = withHelpers()(({ children, router, to, main, ...props }) => {
    const inverted = useIsInverted();

    const names = cn({
        'header-link': true,
        'header-link-main': main,
    });

    return (
        <div className={cn({ root: true, inverted })} {...props}>
            {(router && to) ? (
                <Match path={`${to}/*`}>
                    {({ match }) => (
                        <Link to={to} className={cn({ 'active': match }, names)}>
                            {children}
                        </Link>
                    )}
                </Match>
            ) : (
                <a href={to} className={names}>{children}</a>
            )}

            <style jsx>{`
                .root {
                    align-self: center;
                }

                .root:not(:last-child) {
                    padding-right: 0.75em;
                }

                .root :global(.header-link) {
                    color: var(--accent-5);
                    text-decoration: none;
                    transition: color 0.2s ease;
                }

                .inverted.root :global(.header-link) {
                    color: var(--accent-3);
                }

                .root :global(.header-link):hover {
                    color: var(--foreground);
                }

                .inverted.root :global(.header-link):hover {
                    color: var(--backgrund);
                }

                .root :global(.header-link-main) {
                    font-weight: bold;
                    color: var(--foreground);
                }

                .inverted.root :global(.header-link-main) {
                    color: var(--background);
                }
            `}</style>
        </div>
    );
});

Header.Link = HeaderLink;
Header.Seperator = HeaderSeperator;

export default Header;
