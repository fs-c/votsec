import React from 'react';

export const Spacer = ({ height = 1, small = false, large = false }) => (
    <div className='root'>
        <style jsx>{`
            .root {
                height: ${small ? '0.5em' : large ? '3em' : height + 'em'};
            }
        `}</style>
    </div>
);
