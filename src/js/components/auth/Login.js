import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from '../../actions/Actions'
import { isLoggedIn } from '../../helpers/isLoggedIn';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    handleFormSubmit(e) {
        e.preventDefault(); 
        this.props.login(this.state);
    }

    handleInputChange (e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    render() {
        if(isLoggedIn() || this.state.isLoggedIn) {
            return <Redirect to='/medialist' />;
        }
        return (
            <div className="container">
                <div className="row px-2">
                    <div className="col-12 col-md-5 auth-box">
                        <h3 className="text-center mt-4">Log in to your account</h3>
                        <p className="text-center text-danger mt-4"> { this.state.error } </p>
                        <form className="px-3 py-5">
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="ion ion-person"></i></div>
                                    </div>
                                    <input type="text" name="username" onChange={ (event) => this.handleInputChange(event) } className="form-control form-control-lg" id="username" value={ this.state.username } placeholder="Username" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="ion ion-eye"></i></div>
                                    </div>
                                    <input type="password" name="password" onChange={ (event) => this.handleInputChange(event) } className="form-control form-control-lg" id="password" value={ this.state.password } placeholder="Password" />
                                </div>
                            </div>
                            <button type="submit" onClick={(event) => this.handleFormSubmit(event) } className="btn btn-tertiary btn-block">Login</button>
                        </form>
                        <a href="./signup" className="auth-box-footer">Don't have an account yet? &nbsp;<span>Sign Up</span></a>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.User.isLoggedIn
    }
}
// const map
export default connect(mapStateToProps, { login })(Login);
