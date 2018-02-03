import React from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
	class Authenticate extends React.Component {
		componentWillMount() {
			if (!this.props.isLoggedIn) {
				window.location.href = '../';
			}
		}

		componentWillUpdate(nextProps) {
			if (!nextProps.isLoggedIn) {
				window.location.href = '../';
			}
		}

		render() {
			return (
				<ComposedComponent {...this.props} />
			);
		}
	}

	function mapStateToProps(state) {
		return {
			isLoggedIn: state.User.isLoggedIn
		}
	}

	return connect(mapStateToProps)(Authenticate);
}
