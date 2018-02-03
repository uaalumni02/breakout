
const getMediaRatingObject = (rating) => {
    let ratingScoreObject = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
    };

    for (let i = 0; i < rating.length; i++) {
        const currentRating = rating[i];
        const score = currentRating.score;
        ratingScoreObject[score] += 1
    }

    return ratingScoreObject;
}

const calculateMediaRating = (rating) => {
    console.log(rating);

    if(rating && rating.length) {    
        const ratingData = getMediaRatingObject(rating);
        let totalWeight = 0;
        let totalReviews = 0;

        for (let i in ratingData) {
            const score = i;
            const numberOfReviewsWithScore = ratingData[i];

            const weightMultipliedByNumber = i * ratingData[i];
            totalWeight += weightMultipliedByNumber;
            totalReviews += numberOfReviewsWithScore;
        }

        const averageRating = totalWeight / totalReviews;

        return Math.round(averageRating * 100) / 100;
    } else {
        return 0
    }
} 


export {
    calculateMediaRating,
}