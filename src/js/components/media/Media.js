import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addRating, getMedia, addComment } from '../../actions/Actions'
import { isLoggedIn } from '../../helpers/isLoggedIn';
import { format } from '../../helpers/DateTime';
import { getTokenData } from '../../helpers/isLoggedIn';
import { calculateRating, calculateMediaRating } from '../../helpers/CalculateRating'
import { UserAlreadyRated } from '../../helpers/UserAlreadyRated';


class Media extends Component {
    constructor(props) {
        super(props);
        this.media_id = props.match.params.media_id;
        this.props.getMedia(this.media_id);

        this.state = {
            text: '',
            userTokenData: getTokenData()
        }
    }

    rateMedia(event, value) {
        const media_id = this.media_id;
        const score = parseInt(value);

        this.props.addRating(this.media_id, { media_id, score })
    }


    handleInputChange(event) {
        this.setState({
            text: event.target.value,
        })
    }

    handleSubmitReview() {
        const text = this.state.text;
        const media_id = this.props.match.params.media_id;
        const firstname = this.state.userTokenData.firstname;
        const username = this.state.userTokenData.username;
        const requestBody = { text, media_id, username, firstname };

        this.props.addComment(media_id, requestBody);
    }

    render() {
        const { media, comments, ratings } = this.props.media;
        const rating_score = calculateMediaRating(ratings);

        const mediaData = media ? media : {};
        const allComments = comments ? comments.map((comment, index) => {
            return (
                <li key={index}><span className="comment__author"> <strong> { comment.firstname  } </strong> </span> <p> {comment.text} </p> </li>
            )
        }) : null
        return (
            <div>

                <div className="container text-center">

                { 
                    mediaData.type == 'youtube'
                 ?
                <div className="mx-auto videoContainer media-container">
                    <iframe width="1920" height="1080" src={`https://www.youtube.com/embed/${mediaData.link}`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                    <div className="position-relative video-author-div">
                        <span> 
                            <h3 className=""> { mediaData.title } </h3>
                            <span className="text"> {format(mediaData.created)} by <a href={`../user/${ mediaData.username }`}> { mediaData.username } </a> </span>
                        </span>
                    </div>
                </div>
                :
                <div className="mx-auto media-audio-container">
                <iframe scrolling="no" frameBorder="no" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${mediaData.link}&amp;color=0066cc`}></iframe>
                    <div className="position-relative audio-author-div">
                        <span> 
                            <h3 className="text-white"> { mediaData.title } </h3> <br />
                            <span className="text-white"> {format(mediaData.created)} by <a href={`../user/${ mediaData.username }`}> { mediaData.username } </a> </span>
                        </span>
                    </div>
                </div>
                }

                { 

                    !UserAlreadyRated(ratings, this.state.userTokenData.username) ?
                
                <div className="container text-center">
                    <div className="review__stars">
                        <input type="radio" name="rating" selected onClick={(event) => this.rateMedia(event, 5) } id="star-5" required />
                        <label htmlFor="star-5"></label>
                        <input type="radio" name="rating" onClick={(event) => this.rateMedia(event, 4) } id="star-4" required />
                        <label htmlFor="star-4"></label>
                        <input type="radio" name="rating" onClick={(event) => this.rateMedia(event, 3) }  id="star-3" required />
                        <label htmlFor="star-3"></label>
                        <input type="radio" name="rating" onClick={(event) => this.rateMedia(event, 2) }  id="star-2" required />
                        <label htmlFor="star-2"></label>
                        <input type="radio" name="rating" onClick={(event) => this.rateMedia(event, 1) }  id="star-1" required />
                        <label htmlFor="star-1"></label>
                    </div>
                </div> : null

                }

                { 
                    rating_score == 0 ?
                        <span className="text-white"> No Ratings yet </span> :
                        <span className="text-white"> Rated { rating_score } / 5 </span>

                }


                <div className="review-box col-12 col-md-8 mx-auto position-relative mt-5">
    
                    <textarea name="" id="video-review" cols="30" rows="10" placeholder="Leave a review" 
                        onChange={ (event) => this.handleInputChange(event) }
                    ></textarea>
                    <div className="review__section">
                        <div className="col-12 p-0">
                            <button className="btn btn-tertiary btn-block review-btn"
                                onClick={ (event) => this.handleSubmitReview()}
                            >Submit Review</button>
                        </div>
                    </div>
                </div>

                <div className="review-comments mt-5  col-12 col-md-8 mx-auto position-relative">
        
                    <h3>Reviews</h3>

                    <ul className="comment-list">
                        { this.props.media.comments && this.props.media.comments.length ? allComments : <h6 className="text-center text-white"> No Reviews Yet </h6>  }
                    </ul>
                </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        media: state.Media.media
    }
}
// const map
export default connect(mapStateToProps, { getMedia, addRating, addComment })(Media);