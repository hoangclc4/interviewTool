import React from 'react'
import './SignupPopup.scss'
class SignupPopup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		return (
			<div className="login-popup">
				<div className="login-popup_inner">
					<form className="form-info">
						<div className="login-popup-header">
							<p>Sign up</p>
						</div>
						<div className="login-popup-body">
							<div className="form-field">
								<label htmlFor="email">Email</label>
								<input
									type="email"
									id="email"
									name="email"
									className="form-input"
									placeholder="Enter your email"


								/>
							</div>
							<div className="form-field">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									id="password"
									name="password"
									className="form-input"
									placeholder="Enter your password"

								/>
							</div>

							<div className="form-field">
								<label htmlFor="password">Confirm password</label>
								<input />
							</div>
						</div>
						<div className="login-popup-footer">
							<div className="form-field">
								<div className="button-group">
									<button type="submit" className="btn-login">
										<div
										// className={isLoading ? "fa fa-spinner fa-spin" : ""}
										></div>
										LOGIN
									</button>
									<button
										className="b-close"
										type="button"
										onClick={this.props.togglePopup}
									>
										Close
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default SignupPopup;