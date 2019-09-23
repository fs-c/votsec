import React from 'react';

const StepsPane = () => (
    <div>
        <ul>
            <li>
                <span className='numbering'>1</span>
                <span className='content'>
                    <strong>Create a new vote</strong>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </span>
            </li>

            <li>
                <span className='numbering'>2</span>
                <span className='content'>
                    Screening Phase: <strong>Users express their <i>interest</i></strong>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </span>
            </li>

            <li>
                <span className='numbering'>3</span>
                <span className='content'>
                    Voting Phase: <strong>Users vote on your vote</strong>
                    Phasellus justo mauris, facilisis vitae ultrices in, viverra ac tortor. Praesent congue enim at viverra facilisis. Proin purus neque, ultricies at faucibus vitae, interdum ac ex.
                </span>
            </li>

            <li>
                <span className='numbering'>4</span>
                <span className='content'>
                    <strong>You made your opinion heard</strong>
                </span>
            </li>
        </ul>

        <style jsx>{`
            ul {
                padding: 0;
            }

            ul li {
                display: flex;
            }

            ul .numbering { 
                position: relative;
                color: var(--accent-3);
                padding: 0 1.5em 0 0;
            }

            ul .numbering::after { 
                content: "";
                position: absolute;
                z-index: 2;
                right: 0;
                top: 0;
                transform: translate(50%, 50%);
                border-radius: 50%;
                background: #fff;
                border: 1px var(--accent-3) solid;
                width: .8em;
                height: .8em;
            }


            li .content {
                padding: 0 1.5em 1.5em 1.5em;
                position: relative;
            }

            li .content::before {
                content: "";
                position: absolute;
                z-index: 1;
                left: 0;
                height: 100%;
                border-left: 1px var(--accent-3) solid;
            }

            ul strong {
                display: block;
                font-weight: bolder;
            }
        `}</style>
    </div>
);

export default StepsPane;
