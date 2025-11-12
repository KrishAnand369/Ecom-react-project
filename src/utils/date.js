
import dayjs from 'dayjs';

export function formatDateByFormat(timestampMs, formatString){
    return dayjs(timestampMs).format(formatString);
    
}

export function formatDate(timestampMs){
    return dayjs(timestampMs).format('dddd,MMMM D');
    
}