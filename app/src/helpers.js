async function checkAuthentication() {
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
function formatServerError(err) {
	try {
		let message = '';
		const { data } = err.response;

		if (data.error)
			message += data.error;
		if (data.message !== data.error)
			message += ': ' + data.message;

		return message;
	} catch (e) { /* Swallow */}

	return err.message;
}

export { checkAuthentication, formatServerError };
