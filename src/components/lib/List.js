import React from 'react';

import cn from 'classnames';

import { withHelpers, useIsInverted } from './utils'

const List = withHelpers()(({ children, className, ...props }) => {
    const inverted = useIsInverted();

    return (
        <div className={cn('list', className)} {...props}>
           {children}

           <style jsx>{`
               div {
                   border-radius: var(--border-radius);
                   border: 1px solid var(--${inverted ? 'accent-3' : 'foreground'});
                   color: var(--${inverted ? 'background' : 'foreground'});
                   /* Since backgrounds would break the border otherwise */
                   overflow: hidden;
               }
           `}</style>
        </div>
    );
});

const ListItem = withHelpers()(({ children, muted, ...props }) => {
    const inverted = useIsInverted();
    
    return (
        <div className={cn('list-item', { muted })} {...props}>
            {children}

            <style jsx>{`
                .list-item {
                    padding: 0.75em;
                    color: var(--${inverted ? 'background' : 'foreground'});
                }

                .list-item:not(:last-child) {
                    border-bottom: inherit;
                }

                .muted {
                    background-color: var(--accent-1);
                }
            `}</style>
        </div>
    );
});

List.Item = ListItem;

export default List;
