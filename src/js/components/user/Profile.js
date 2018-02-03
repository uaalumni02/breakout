import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserProfile, addMedia } from '../../actions/Actions'

import { isLoggedIn, getTokenData } from '../../helpers/isLoggedIn';
import { format, formatDate } from '../../helpers/DateTime';
import { getMediaId } from '../../helpers/GetMediaLinkID';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.props.getUserProfile(this.props.match.params.username)
        this.state = {
            title: '',
            type: 'youtube',
            link: '',
        }
    }


    handleFormSubmit(e) {
        e.preventDefault(); 
        const link = getMediaId(this.state.link, this.state.type);
        const title = this.state.title;
        const type = this.state.type;
        const requestData = {link, type, title}
        this.props.addMedia(requestData);
    }

    handleInputChange (e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    componentWillMount() {
        this.setState({
            user: getTokenData()
        })
    }


    render() {
        console.log(this.props)

        const allMediaTabs = this.props.media.length ? this.props.media.map((media, index) => {
            return (
                <div>
                    <a href={`../media/${media.media_id}`}
                        className="list-group-item d-flex justify-content-between text-success">
                        <i className="ion ion-headphone"> &nbsp; { media.title } </i>                        
                        </a>

                </div>
            )
        }) : 'User has no media'

        const allUserComments = this.props.comments.length ? this.props.comments.map((media, index) => {
            console.log(allUserComments)
            return (
                <div>
                    <a href={`../media/${media.media_id}`}
                        className="list-group-item d-flex justify-content-between text-success">
                            <i className="ion ion-headphone"> &nbsp; { media.title } </i>                        
                    </a>
                </div>
            );
        }) : 'No Comments yet'

        return (
            <div className="container">
                {
                    this.props.user ?
                        <div className="container">
                            <h2 className="text-center">
                                <span className="text-center text-success">
                                    {this.props.user.username}'s profile
                </span> </h2>

                            <div className="mt-5 profile col-12 col-md-8 mx-auto position-relative">
                                <div className="row px-2 mt-5">

                                    <div className="col-12 col-md-12 profile-box">
                                        <div className="">
                                            <center>
                                                <div className="profile-about" style={{ "width": "30rem" }}>
                                                    <img className="card-img-top img-avatar" src="http://images.clipartpanda.com/microphone-with-music-notes-clipart-mic-vector.svg" alt="Card image cap" />
                                                    <div className="card-block">
                                                        <br />
                                                        <div className="detail">
                                                            <small className="text-success"> FIRSTNAME </small>
                                                            <h3 className="message text-dark">
                                                                {this.props.user.firstname}
                                                            </h3>
                                                        </div>


                                                        <div className="detail">
                                                            <small className="text-success"> JOINED </small>
                                                        <h3 className="message text-dark">
                                                                {formatDate(this.props.user.created)}

                                                            </h3>
                                                        </div>


                                                        <div className="detail">
                                                            <small className="text-success"> LAST LOGIN </small>
                                                        <h3 className="message text-dark">
                                                                {format(this.props.user.last_login)}
                                                            </h3>
                                                        </div>


                                                        <div className="detail">
                                                            <small className="text-success"> EMAIL ADDRESS </small>
                                                            <h3 className="message text-dark">
                                                                { this.props.user.email }
                                                    </h3>
                                                        </div>


                                                        {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                                    </div>
                                                </div>
                                            </center>
                                        </div>



                    <div className="modal fade" id="submitModal" tabIndex="-1" role="dialog" aria-labelledby="submitModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Upload Song</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form name="media-form" className="px-3 py-5">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="ion ion-ios-musical-note"></i></div>
                                                    </div>
                                                    <input type="text" onChange={ (event) => this.handleInputChange(event) } name="title" className="form-control form-control-sm" id="title" required placeholder="Title" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="ion ion-ios-videocam"></i></div>
                                                    </div>
                                                    <select name="type" required className="custom-select custom-select-sm" onChange={ (event) => this.handleInputChange(event) } >
                                                        <option defaultValue value='youtube'>YouTube</option>
                                                        <option value="sc">SoundCloud</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="ion ion-link"></i></div>
                                                    </div>
                                                    <textarea type="url" name="link" className="form-control form-control-sm" onChange={ (event) => this.handleInputChange(event) } id="link" required placeholder="Embed link here"></textarea>
                                                </div>
                                            </div>
                                            <center>
                                                <button type="submit" className="btn btn-tertiary" onClick={(event) => this.handleFormSubmit(event) }> 
                                                    <i className="ion ion-paper-airplane"></i> Upload Song
                                                </button>
                                            </center>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                                        <ul className="nav nav-tabs" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active text-success" data-toggle="tab" href="#shared" role="tab" >
                                                <i className="ion ion-mic-c"> &nbsp;  Uploaded Songs </i>
                                                
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link text-success" data-toggle="tab" href="#reviewed" role="tab">
                                                
                                                <i className="ion ion-edit"> &nbsp;  Reviewed Songs </i>
                                                </a>
                                            </li>
                                        </ul>



                                        <div className="tab-content">

                                            {this.props.media.length ?


                                                <div className="tab-pane active" id="shared" role="tabpanel">
                                                    <div className="section mt-5">
                                                        <ul className="list-group">
                                                            { allMediaTabs }
                                                        </ul>
                                                    </div>
                                                </div>

                                                : null
                                            }

                                            
                                            <div className="tab-pane" id="reviewed" role="tabpanel">
                                                <div className="section mt-5">
                                                    { allUserComments }
                                                </div>
                                            </div>
                                            <br />
                                            <br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.Profile.user,
        media: state.Profile.media,
        comments: state.Profile.media
    }
}
// const map
export default connect(mapStateToProps, { getUserProfile, addMedia })(Profile);