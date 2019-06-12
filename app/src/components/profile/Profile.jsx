import React, { Component } from 'react';

import { Header, Table } from 'semantic-ui-react';

export default class Profile extends Component {
    render() {
		if (!this.props.user)
			return <p>Loading user...</p>

        return (
			<React.Fragment>
				<Header as='h1'>
					Profile information
				</Header>

				<Table>
					<thead>
						<tr>
							<th>Claim</th>
							<th>Value</th>
						</tr>
					</thead>
					<tbody>
						{Object.keys(this.props.user).map((key) => {
							return (
								<tr key={key}>
									<td>{key}</td>
									<td>{this.props.user[key].toString()}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</React.Fragment>
        );
    }
};
