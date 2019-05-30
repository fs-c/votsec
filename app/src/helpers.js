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

export { checkAuthentication };
