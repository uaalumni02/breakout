import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


import { signup } from '../../actions/Actions'
import { isLoggedIn } from '../../helpers/isLoggedIn';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            username: '',
            password: '',
            email: '',
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.props.signup(this.state);
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
                    <div className="col-12 col-md-5 auth-box sign-up">
                        <h3 className="text-center mt-4">Sign up for an account</h3>
                        <p className="text-center text-danger mt-4"> { this.state.error } </p>
                        <form className="px-3 py-5">
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="ion ion-happy"></i></div>
                                    </div>
                                    <input type="text" name="firstname" onChange={ (event) => this.handleInputChange(event) } className="form-control form-control-lg" id="first-name" placeholder="First name" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="ion ion-person"></i></div>
                                    </div>
                                    <input type="text" name="username"  onChange={ (event) => this.handleInputChange(event) } className="form-control form-control-lg" id="username" placeholder="Username" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="ion ion-email"></i></div>
                                    </div>
                                    <input type="email" name="email"  onChange={ (event) => this.handleInputChange(event) } className="form-control form-control-lg" id="email" placeholder="Email" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="ion ion-eye"></i></div>
                                    </div>
                                    <input type="password" name="password"  onChange={ (event) => this.handleInputChange(event) } className="form-control form-control-lg" id="password" placeholder="Password" />
                                </div>
                            </div>
                            <button type="submit" onClick={(event) => this.handleFormSubmit(event) } className="btn btn-tertiary btn-block">Register</button>
                        </form>
                        <a href="./login" className="auth-box-footer">Have an account? &nbsp;<span>Sign In</span></a>
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
export default connect(mapStateToProps, { signup })(Signup);