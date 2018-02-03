const userHasRating = (ratings, username) => {
    if(!ratings || !ratings.length) {
        return;
    }
    return ratings.find((review) => {
        return review.username === username 
      });
}

export const UserAlreadyRated = (ratings, username) => {
    return userHasRating(ratings, username) ?
        true :
        false;
}