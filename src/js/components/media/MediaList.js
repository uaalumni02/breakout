import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getAllMedia, addMedia } from '../../actions/Actions'

import { isLoggedIn, getTokenData } from '../../helpers/isLoggedIn';
import { format } from '../../helpers/DateTime';
import { getMediaId } from '../../helpers/GetMediaLinkID';
import mic_2 from '../../../images/mic_2.png'

class MediaList extends Component {
    constructor(props) {
        super(props);
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

    componentDidMount() {
        if(isLoggedIn()) 
            this.props.getAllMedia();
        
    }

    render() {
        if(!isLoggedIn()) {
            return <Redirect to='/login' />;
        }

        const AllMediaList = this.props.allMedia.map((media, index) => {
            return (
                <div className="col-sm-6 my-3" key={index}>
                    <div className="card">
                    { media.type === 'youtube' ?
                            <img className="card-img-top" src={`https://img.youtube.com/vi/${media.link}/0.jpg`} />
                        :
                        <img className="card-img-top" src="https://www.indexventures.com/sites/default/files/styles/large/public/logos/Soundcloud%20copy.png?itok=hATAxsnD" />
                    }
                        <div className="card-body">
                            <h3 className="card-text black-text"> {media.title} </h3>
                            <span className=""> {format(media.created)} </span>
                            <p>  By <a href={`/user/${media.username}`} className="card-text text-success"> 
                                { this.state.user.username === media.username ? 'You ' : media.username } 
                                </a>
                            </p>

                            <a href={`./media/${media.media_id}`} className="btn btn-secondary"><i className="ion ion-headphone"></i> LISTEN</a>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className="media-list">
                <div className="container">
                    <div className="review-comments mt-5 col-12 col-md-8 mx-auto position-relative">

                        <h3 className="text-center text-success"> Recently Uploaded Songs </h3>
                        <h3 className="text-center">
                        </h3>
                        <div className="row">
                            { AllMediaList }
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
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allMedia: state.AllMedia.allMedia
    }
}
// const map
export default connect(mapStateToProps, { getAllMedia, addMedia })(MediaList);