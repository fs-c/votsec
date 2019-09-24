import React from 'react';

import cn from 'classnames';

const List = ({ children }) => (
    <div className='list'>
        {children}

        <style jsx>{`
            .list {
                border-radius: var(--border-radius);
                border: 1px solid var(--accent-3);
                /* Since backgrounds would break the border otherwise */
                overflow: hidden;
            }
        `}</style>
    </div>
);

const ListItem = ({ children, muted }) => (
    <div className={cn('list-item', { muted })}>
        {children}

        <style jsx>{`
            .list-item {
                padding: 0.75em;
            }

            .list-item:not(:last-child) {
                border-bottom: 1px solid var(--accent-3);
            }

            .muted {
                background-color: var(--accent-1);
            }
        `}</style>
    </div>
);

List.Item = ListItem;

export default List;
