import React, { useContext } from 'react';

import cn from 'classnames';
import css from 'styled-jsx/css'

import { getDisplayName } from '../../helpers';
import { InvertionContext } from './Container';

export const useIsInverted = () => {
    return useContext(InvertionContext);
};

export const withHelpers = () => {
    return (WrappedComponent) => {
        const WithHelpers = ({
            children,
            h, w,
            align, justify,
            m, mx, my, mt, mr, mb, ml,
            p, px, py, pt, pr, pb, pl,
            ...props,
        }) => {
            const hasFlex = align || justify;
            const hasWidth = w;
            const hasHeight = h;
            const hasMargin = m || mx || my || mt || mr || mb || ml;
            const hasPadding = p || px || py || pt || pr || pb || pl;

            const flexStyle = css.resolve`
                align-items: ${align || 'stretch'};
                justify-content: ${justify || 'flex-start'};
            `;

            const widthStyle = css.resolve`width: ${w || 'auto'}!important;`;
            const heightStyle = css.resolve`height: ${h || 'auto'}!important;`;

            const marginStyle = css.resolve`
                margin: ${m ? m : `${mt || my || '0'} ${mr || mx || '0'} `
                    + `${mb || my || '0'} ${ml || mx || '0'}`};                
            `;
            const paddingStyle = css.resolve`
                padding: ${p ? p : `${pt || py || '0'} ${pr || px || '0'} `
                    + `${pb || py || '0'} ${pl || px || '0'}`};                
            `;

            return (
                <WrappedComponent className={cn({
                    [flexStyle.className]: hasFlex,
                    [widthStyle.className]: hasWidth,
                    [heightStyle.className]: hasHeight,
                    [marginStyle.className]: hasMargin,
                    [paddingStyle.className]: hasPadding
                })} {...props}>
                    {children}

                    {flexStyle.styles}
                    {widthStyle.styles}
                    {heightStyle.styles}
                    {marginStyle.styles}
                    {paddingStyle.styles}
                </WrappedComponent>
            );
        };

        WithHelpers.displayName = `WithHelpers(${getDisplayName(WrappedComponent)})`;

        return WithHelpers;
    };
};

export const Spacer = ({ size = 1, small = false, large = false, ...props }) => (
    <div className='root' {...props}>
        <style jsx>{`
            .root {
                height: ${small ? '0.5em' : large ? '3em' : size + 'em'};
            }
        `}</style>
    </div>
);

export const DiagonalSeparator = ({ width, height, reversed }) => {
    const inverted = useIsInverted();

    if (inverted) {
        return (
            <div className={cn('separator', { reversed })}>
                <style jsx>{`
                    .separator {
                        width: 0;
                        height: 0;
                        border-style: solid;
                        border-width: ${height}vh ${width}vw 0 0;
                        border-color: var(--foreground)
                            transparent transparent transparent;
                    }

                    .reversed.separator {
                        border-width: ${height}vh 0 0 ${width}vw;
                    }
                `}</style>
            </div>
        )
    } else {
        // TODO: Implement this properly

        return <></>
        
        /* const alpha = Math.atan(height / width);
        const gamma = 90 * (Math.PI / 180);
        const beta = Math.PI - alpha - gamma;

        const hypo = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
        const half = hypo / 2;

        const deltaX = half - (half * Math.sin(alpha)) / (Math.sin(gamma));
        const deltaY = (half * Math.sin(beta)) / (Math.sin(gamma));

        console.log({ hypo, height, width, alpha, deltaX, deltaY });

        return (
            <div className={cn('separator', { reversed })}>
                <style jsx>{`
                    .separator {
                        width: ${hypo}vw;
                        height: 1px;
                        border-bottom: 1px solid var(--foreground);

                        transform: rotate(${alpha}rad) translateY(${deltaY}vh) translateX(${deltaX * -1}vw);
                    }

                    .reversed.separator {
                        transform: rotate(${0}rad) translateY(${0}vh);
                    }
                `}</style>
            </div>
        ) */
    }
};
