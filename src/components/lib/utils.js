import React, { useContext } from 'react';

import cn from 'classnames';

import { InvertionContext } from './Container';

export const useIsInverted = () => {
    return useContext(InvertionContext);
};

export const Spacer = ({ height = 1, small = false, large = false }) => (
    <div className='root'>
        <style jsx>{`
            .root {
                height: ${small ? '0.5em' : large ? '3em' : height + 'em'};
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
