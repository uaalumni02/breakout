import moment from 'moment';

const format = (datetime) => moment(datetime).format('lll');
const formatDate = (datetime) => moment(datetime).format('LL')

export {
    format,
    formatDate,
}