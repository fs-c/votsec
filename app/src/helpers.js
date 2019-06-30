import moment from 'moment';
import config from '../../config.js';

import querystring from 'querystring';

export async function checkAuthentication() {
	const authenticated = await this.props.auth.isAuthenticated();

	if (this.state.authenticated !== authenticated) {
		if (authenticated && !this.state.user) {
			const user = await this.props.auth.getUser();

			this.setState({
				user,
				authenticated,
				isAdmin: user.groups.includes('Admin'),
			});
		} else {
			this.setState({ authenticated });
		}
	}
}

// TODO: This is a quick hack
export function formatServerError(err) {
	try {
		let message = '';
		const { data } = err.response;

		if (data.error)
			message += data.error;
		if (data.message !== data.error)
			message += ': ' + data.message;

		return message;
	} catch (e) { /* Swallow */ }

	return err.message;
}

export function formatVoteTimes(start, end, capitalized = true) {
	const startDate = moment(start).fromNow();
	const endDate = moment(end).fromNow();

	const timeOver = Date.now() >= new Date(end);

	return `${capitalized ? 'S' : 's'}tarted ${startDate}, `
		+ `${timeOver ? 'ended' : 'ending'} ${endDate}`;
}

const { url, port } = config.resourceServer;
export function buildApiString(path, query = {}) {
	return `${url}:${port}/${path}${query ? `?${querystring.encode(query)}` : ''}`;
}

export function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
