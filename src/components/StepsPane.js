import React from 'react';

import { breakpoints } from './lib/styles/constants';

import List from './lib/List';
import Input from './lib/Input';
import Button from './lib/Button';

const ExampleAddVote = () => (
    <List>
        <List.Item muted>
            <div className='title'>
                Create a new vote
            </div>
        </List.Item>

        <List.Item>
            <div className='content'>
                <div className='input'>
                    <Input placeholder='Vote title' fluid />
                </div>

                <div className='button'>
                    <Button>Add Vote</Button>
                </div>
            </div>
        </List.Item>

        <style jsx>{`
            .title {
                font-size: 1.15em;
                font-weight: bold;
            }

            .content {
                display: flex;
                flex-direction: column;
            }

            .content .input {
                flex-grow: 1;
                margin: 0 0 0.5em 0;
            }

            @media (min-width: ${breakpoints.mobile}) {
                .content {
                    flex-direction: row;
                }

                .content .input {
                    margin: 0 0.75em 0 0;
                }
            }
        `}</style>
    </List>
);

const ExampleVoteInterestItem = ({ title }) => (
    <div className='wrapper'>
        <div className='content'>
            <div className='title'>
                {title}
            </div>

            <div className='button'>
                <Button>Interested</Button>
            </div>
        </div>

        <style jsx>{`
            .wrapper:not(:last-child) {
                border-bottom: 1px solid var(--accent-3);
            }

            .content {
                display: flex;
                flex-direction: column;
            }

            .content .title {
                flex-grow: 1;
                margin: 0 0 0.5em 0;
            }

            @media (min-width: ${breakpoints.mobile}) {
                .content {
                    flex-direction: row;
                }

                .content .title {
                    margin: 0 0.75em 0 0;
                    align-self: center;
                }

                .content .button {
                    align-self: flex-end;
                }
            }
        `}</style>
    </div>
);

const ExampleVoteInterestList = () => (
    <List>
        <List.Item>
            <ExampleVoteInterestItem title='Should votes be forbidden?' />
        </List.Item>

        <List.Item>
            <ExampleVoteInterestItem title='Can amendment 5 of document 2847 be considered to be in spiritual compliance with Article II of the constitution?' />            
        </List.Item>
    </List>
);

const StepsPane = () => (
    <div>
        <ul>
            <li>
                <span className='numbering'>1</span>
                <span className='content'>
                    <strong>Anyone can add a vote</strong>
                    <ExampleAddVote />
                </span>
            </li>

            <li>
                <span className='numbering'>2</span>
                <span className='content'>
                    <strong>Others express their interest</strong>
                    <ExampleVoteInterestList />
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
                width: 100%;
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
                margin-bottom: 0.5em;
            }
        `}</style>
    </div>
);

export default StepsPane;
