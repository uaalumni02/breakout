import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import img_3_transparent from '../../../images/img_3_transparent.png';


import { isLoggedIn, getTokenData } from '../../helpers/isLoggedIn';
class Header extends Component {
    constructor(props) {
        super(props);
            this.state = {
                tokenData: {},
            }
    }

    componentWillReceiveProps() {
        if(this.props.isLoggedIn)
            this.setState({
                tokenData: getTokenData()
            })
    }

    componentDidMount() {
        if(this.props.isLoggedIn)
            this.setState({
                tokenData: getTokenData()
            })
    }


    render() {
        return (
            <div className="nav">
                <header className="container mb-3">
                    <nav className="navbar navbar-expand-sm navbar-light bg-transparent">
                        <a className="navbar-brand" href="../">
                        <img src={img_3_transparent} width="100" height="100" alt="" /></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {
                            this.props.isLoggedIn ?
                                <div className="collapse navbar-collapse" id="navbarToggle">
                                    <div className="navbar-nav ml-md-auto d-md-flex">

                                    <a className="nav-item nav-link link-1" href="#" data-toggle="modal" data-target="#submitModal">
                                            Upload
                                    </a>


                                    <a className="nav-item nav-link link-1" href="../medialist">
                                            Discover
                                    </a>
                                        <a className="nav-item nav-link link-1" href={`../user/${this.state.tokenData.username}`}>
                                            My Profile
                            </a>
                                    </div>
                                </div> :
                                <div className="collapse navbar-collapse" id="navbarToggle">
                                    <div className="navbar-nav ml-md-auto d-md-flex">
                                        <a className="nav-item nav-link link-1" href="./login">
                                            Login
                                    </a>
                              
                                    </div>
                                </div>
                        }

                    </nav>
                </header>
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
export default connect(mapStateToProps, {})(Header);