import React, { Component } from 'react';
import { isLoggedIn } from '../../helpers/isLoggedIn';
import { Redirect } from 'react-router-dom';

class Home extends Component {
    render() {
        // if(isLoggedIn()) {
        //     return <Redirect to='/medialist' />;
        // }
        return (
            <div className="container text-center">
                <div className="mx-auto videoContainer">
                    <iframe title="Video" width="1920" height="1080" src="https://www.youtube.com/embed/5I1v7aXYitI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
                <a href="./login" className="btn btn-primary mt-1 mb-1">Log in</a> &nbsp; &nbsp;
            <a href="./signup" className="btn btn-primary mt-1 mb-1">Sign up</a>
            </div>

        )
    }
}

export default Home;