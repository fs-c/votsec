import React, { useState } from 'react';

import cn from 'classnames';

const Input = ({ placeholder, fluid, ...props }) => {
    const [ focused, setFocused ] = useState(false);

    return (
        <div className={cn('wrapper', { focused, fluid })} {...props}>
            <div className='input-wrapper'>
                <input placeholder={placeholder}
                    onBlur={() => setFocused(false)}
                    onFocus={() => setFocused(true)}
                />
            </div>

            <style jsx>{`
                .wrapper {
                    align-items: center;
                    border-radius: 5px;
                    border: 1px solid var(--accent-3);
                    display: inline-flex;
                    height: 37px;
                    position: relative;
                    transition: border 0.2s ease, color 0.2s ease;
                    vertical-align: middle;
                }

                .wrapper.fluid {
                    width: 100%;
                }

                .wrapper.focused {
                    border: 1px solid var(--accent-8)
                }

                .input-wrapper {
                    display: block;
                    margin: 4px 10px;
                    position: relative;
                    width: 100%;
                }

                input {
                    background-color: transparent;
                    border-radius: 0;
                    border: none;
                    box-shadow: none;
                    box-sizing: border-box;
                    display: block;
                    outline: 0;
                    width: 100%;
                }
            `}</style>
        </div>
    );
};

export default Input;
