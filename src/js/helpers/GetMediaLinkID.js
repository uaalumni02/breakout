const getYoutubeId = (pastedData) => {
    let youtube_id = '';
    if (pastedData.match('http|https://(www.)?youtube|youtu\.be')) {
        if (pastedData.match('embed')) {
            youtube_id = pastedData.split(/embed\//)[1].split('"')[0];
        }
        else {
            youtube_id = pastedData.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
        }
        return youtube_id;
    }
};

const getScId = (pastedData) => {
    return pastedData.split('tracks/')[1].match(/\d{1,}/)[0];
};


const getMediaId = (pastedData, type) => {
    var success = false;
    switch (type) {
        case 'youtube':
            return getYoutubeId(pastedData);
        case 'sc':
            return getScId(pastedData);
        default:
            return getYoutubeId(pastedData);
    }

}

export {
    getMediaId,
}