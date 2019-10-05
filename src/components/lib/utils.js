import React from 'react';

import cn from 'classnames';
import { siteWidth } from '../../constants';

export const Flex = ({ children, className, direction = 'column', ...props }) => (
    <div className={cn(className, 'flex')} {...props}>
        {children}
        
        <style jsx>{`
            .flex {
                margin: 0;
                min-width: 0;

                display: flex;
                flex-direction: ${direction};
            }
        `}</style>
    </div>
);

export const Container = ({ children, className, ...props }) => (
    <div className={cn(className, 'container')} {...props}>
        {children}
        
        <style jsx>{`
            .container {
                width: 100%;
                margin: 0 auto;
                max-width: ${siteWidth};
            }
        `}</style>
    </div>
);